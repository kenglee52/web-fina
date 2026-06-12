import React, { useState, useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Loader2, PlusCircle, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { url } from "../unity/Part";
import { Checkbox } from "@/components/ui/checkbox"; // Shadcn Checkbox component

const Applicant = ({ applied_position_id }) => {
    const { getToken } = useAuth();
    const { user } = useUser();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        applied_position_id: applied_position_id ? Number(applied_position_id) : "",
        fullname: "", // Initialize as empty string
        login_email: user?.primaryEmailAddress?.emailAddress || "",
        expected_salary: "",
        date_of_birth: "",
        nationality: "",
        marital_status: "",
        spouse_name: "",
        spouse_occupation: "",
        spouse_workplace: "",
        number_of_children: "",
        phone_number: "",
        email: "",
        current_address: "",
        language_skills: "",
        computer_skills: "",
        emergency_name: "",
        emergency_relationship: "",
        emergency_phone: "",
        emergency_address: "",
        department_id: "",
        computer_skill_level: "", // Changed to string for single selection
    });
    const [educations, setEducations] = useState([
        { qualification: "", major: "", institution_name: "", graduation_year: "", gpa: "" },
    ]);
    const [cvFile, setCvFile] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null); // New state for photo preview
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const cvInputRef = useRef(null);
    const photoInputRef = useRef(null);

    const steps = [
        { id: 1, name: "Personal Information" },
        { id: 2, name: "Emergency Contact" },
        { id: 3, name: "Education" },
        { id: 4, name: "Documents" },
    ];

    // Clean up photo preview URL
    useEffect(() => {
        return () => {
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    // Fetch departments and positions
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken({ template: "default" });
                const [deptResponse, posResponse] = await Promise.all([
                    axios.get(`${url.base_url}/api/department`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${url.base_url}/api/position`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                console.log("Department response:", deptResponse.data);
                console.log("Position response:", posResponse.data);

                const deptData = Array.isArray(deptResponse.data)
                    ? deptResponse.data
                    : deptResponse.data.departments || [];
                const posData = Array.isArray(posResponse.data)
                    ? posResponse.data
                    : posResponse.data.positions || [];

                const normalizedDepartments = deptData.map((dept) => ({
                    dept_id: dept.dept_id || dept.department_id,
                    dept_name: dept.dept_name || dept.name,
                }));
                const normalizedPositions = posData.map((pos) => ({
                    position_id: pos.position_id,
                    position_title: pos.position_title || pos.title,
                    department_id: Number(pos.dept_id),
                }));

                setDepartments(normalizedDepartments);
                setPositions(normalizedPositions);

                if (applied_position_id) {
                    const selectedPosition = normalizedPositions.find(
                        (pos) => pos.position_id === Number(applied_position_id)
                    );
                    if (selectedPosition) {
                        setFormData((prev) => ({
                            ...prev,
                            department_id: selectedPosition.department_id
                                ? String(selectedPosition.department_id)
                                : "",
                        }));
                    } else {
                        setErrors((prev) => ({ ...prev, applied_position_id: "Invalid position selected" }));
                        console.log("Invalid applied_position_id:", applied_position_id);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setFetchError("Failed to load departments or positions. Please try again.");
                setDepartments([]);
                setPositions([]);
            }
        };
        fetchData();
    }, [getToken, applied_position_id]);

    const levels = ["Excellent", "Good", "Average", "Poor", "Very Poor"];

    const handleSelect = (level) => {
        setFormData((prev) => ({
            ...prev,
            computer_skill_level: prev.computer_skill_level === level ? "" : level, // Toggle or select single level
        }));
        setErrors((prev) => ({ ...prev, computer_skill_level: null }));
    };

    const handleSalaryChange = (e) => {
        const value = e.target.value.replace(/,/g, ''); // ลบ comma เก่า
        if (value === "") {
            // ถ้าผู้ใช้ลบทั้งหมด ให้เก็บเป็น ""
            setFormData((prev) => ({ ...prev, expected_salary: "" }));
            return;
        }

        if (!isNaN(value)) {
            const formattedValue = Number(value).toLocaleString(); // แปลงเป็น comma format
            setFormData((prev) => ({
                ...prev,
                expected_salary: formattedValue
            }));
        }
    };
    // Validate specific step
    const validateStep = (step) => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.applied_position_id || formData.applied_position_id === "none") {
                newErrors.applied_position_id = "Position is required";
            }
            if (!formData.department_id || formData.department_id === "none") {
                newErrors.department_id = "Department is required";
            }
            if (!formData.fullname) newErrors.fullname = "Full name is required";
            if (!formData.login_email) newErrors.login_email = "Login email is required";
            else if (!/\S+@\S+\.\S+/.test(formData.login_email)) newErrors.login_email = "Invalid email format";
            if (!formData.email) newErrors.email = "Contact email is required";
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
            if (!formData.date_of_birth) newErrors.date_of_birth = "Date of birth is required";
            else if (isNaN(Date.parse(formData.date_of_birth))) newErrors.date_of_birth = "Invalid date";
            if (!formData.nationality) newErrors.nationality = "Nationality is required";
            if (!formData.expected_salary) newErrors.expected_salary = "Expected_salary is required";

            if (!formData.marital_status) newErrors.marital_status = "Marital status is required";
            if (formData.marital_status === "Married") {
                if (!formData.spouse_name) newErrors.spouse_name = "Spouse name is required";
                if (!formData.spouse_occupation) newErrors.spouse_occupation = "Spouse occupation is required";
                if (!formData.spouse_workplace) newErrors.spouse_workplace = "Spouse workplace is required";
                if (formData.number_of_children === "" || isNaN(formData.number_of_children) || formData.number_of_children < 0)
                    newErrors.number_of_children = "Number of children is required and must be a non-negative number";
            }
            if (!formData.phone_number) newErrors.phone_number = "Phone number is required";
            else if (!/^\+?\d{10,15}$/.test(formData.phone_number))
                newErrors.phone_number = "Invalid phone number";


            if (!formData.current_address) newErrors.current_address = "Current address is required";
            if (!formData.language_skills) newErrors.language_skills = "Language skills are required";
            if (!formData.computer_skill_level) newErrors.computer_skill_level = "Computer skill level is required";
        } else if (step === 2) {
            if (!formData.emergency_name) newErrors.emergency_name = "Emergency contact name is required";
            if (!formData.emergency_relationship) newErrors.emergency_relationship = "Emergency contact relationship is required";
            if (!formData.emergency_phone) newErrors.emergency_phone = "Emergency phone number is required";
            else if (!/^\+?\d{10,15}$/.test(formData.emergency_phone))
                newErrors.emergency_phone = "Invalid phone number";
            if (!formData.emergency_address) newErrors.emergency_address = "Emergency address is required";
        } else if (step === 3) {
            const validEducations = educations.filter(
                (edu) => edu.qualification.trim() && edu.institution_name.trim()
            );
            if (validEducations.length === 0) newErrors.educations = "At least one valid education record is required";
            educations.forEach((edu, index) => {
                if (!edu.qualification) newErrors[`educations[${index}].qualification`] = "Qualification is required";
                if (!edu.major) newErrors[`educations[${index}].major`] = "Major is required";

                if (!edu.graduation_year) newErrors[`educations[${index}].graduation_year`] = "Graduation_year is required";

                if (!edu.gpa) newErrors[`educations[${index}].gpa`] = "GPA is required";

                if (!edu.institution_name) newErrors[`educations[${index}].institution_name`] = "Institution name is required";
                if (edu.graduation_year && (edu.graduation_year < 1900 || edu.graduation_year > 2100))
                    newErrors[`educations[${index}].graduation_year`] = "Year must be between 1900 and 2100";
                if (edu.gpa && (edu.gpa < 0 || edu.gpa > 4.0)) newErrors[`educations[${index}].gpa`] = "GPA must be between 0 and 4.0";
            });
        } else if (step === 4) {
            if (!cvFile) newErrors.cv = "CV is required";
            else if (!/(\.pdf|\.doc|\.docx)$/i.test(cvFile.name)) newErrors.cv = "CV must be PDF, DOC, or DOCX";
            if (!photoFile) newErrors.photo = "Photo is required";
            else if (!/(\.jpeg|\.jpg|\.png|\.gif|\.webp|\.svg)$/i.test(photoFile.name))
                newErrors.photo = "Photo must be an image (JPEG, JPG, PNG, GIF, WEBP, SVG)";
        }
        return newErrors;
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
       const updatedValue =
  value === "" || value === "none"
    ? ""
    : name === "applied_position_id" || name === "department_id"
    ? Number(value)
    : value;

        setFormData({ ...formData, [name]: updatedValue });
        setErrors({ ...errors, [name]: null });
    };

    // Handle education changes
    const handleEducationChange = (index, field, value) => {
        const newEducations = [...educations];
        newEducations[index][field] = value;
        setEducations(newEducations);
        setErrors({ ...errors, [`educations[${index}].${field}`]: null });
    };

    // Add education record
    const addEducation = () => {
        setEducations([...educations, { qualification: "", major: "", institution_name: "", graduation_year: "", gpa: "" }]);
    };

    // Remove education record
    const removeEducation = (index) => {
        if (educations.length > 1) {
            const newEducations = educations.filter((_, i) => i !== index);
            setEducations(newEducations);
            const newErrors = { ...errors };
            Object.keys(newErrors).forEach((key) => {
                if (key.startsWith(`educations[${index}]`)) delete newErrors[key];
            });
            setErrors(newErrors);
        }
    };

    // Handle file changes
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === "cv") {
            setCvFile(file);
            setErrors({ ...errors, cv: null });
        } else {
            setPhotoFile(file);
            setErrors({ ...errors, photo: null });
            if (file) {
                const previewUrl = URL.createObjectURL(file);
                setPhotoPreview(previewUrl);
            } else {
                setPhotoPreview(null);
            }
        }
    };

    // Handle photo removal
    const handleRemovePhoto = () => {
        setPhotoFile(null);
        if (photoPreview) {
            URL.revokeObjectURL(photoPreview);
            setPhotoPreview(null);
        }
        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }
    };

    // Handle next step
    const handleNext = () => {
        const stepErrors = validateStep(currentStep);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }
        setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    };

    // Handle previous step
    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);

        const stepErrors = validateStep(currentStep);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        setLoading(true);
        try {
            const token = await getToken({ template: "default" });
            if (!token) {
                throw new Error("No token available");
            }

            const validEducations = educations.filter(
                (edu) => edu.qualification.trim() && edu.institution_name.trim()
            );

            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "computer_skill_level") {
                    // Send computer_skill_level as computer_skills string
                    formDataToSend.append("computer_skills", value || "");
                } else if (value && key !== "department_id") {
                    formDataToSend.append(key, value);
                }
            });
            if (validEducations.length > 0) {
                formDataToSend.append("educations", JSON.stringify(validEducations));
            }
            if (cvFile) formDataToSend.append("cv", cvFile);
            if (photoFile) formDataToSend.append("photo", photoFile);

            console.log("Submitting form with data:", {
                ...formData,
                applied_position_id: Number(formData.applied_position_id),
                computer_skills: formData.computer_skill_level || "",
                educations: validEducations,
                cv: cvFile?.name,
                photo: photoFile?.name,
            });

            const res = await axios.post(`${url.base_url}/api/applicants`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setSubmitStatus({ type: "success", message: "Application submitted successfully!" });
            setFormData({
                applied_position_id: applied_position_id ? Number(applied_position_id) : "",
                fullname: "", // Reset to empty string
                login_email: user?.primaryEmailAddress?.emailAddress || "",
                expected_salary: "",
                date_of_birth: "",
                nationality: "",
                marital_status: "",
                spouse_name: "",
                spouse_occupation: "",
                spouse_workplace: "",
                number_of_children: "",
                phone_number: "",
                email: "",
                current_address: "",
                language_skills: "",
                computer_skills: "",
                emergency_name: "",
                emergency_relationship: "",
                emergency_phone: "",
                emergency_address: "",
                department_id: "",
                computer_skill_level: "", // Reset to empty string
            });
            setEducations([{ qualification: "", major: "", institution_name: "", graduation_year: "", gpa: "" }]);
            setCvFile(null);
            setPhotoFile(null);
            setPhotoPreview(null); // Reset photo preview
            if (cvInputRef.current) cvInputRef.current.value = "";
            if (photoInputRef.current) photoInputRef.current.value = "";
            setCurrentStep(1);
        } catch (error) {
            console.error("Error submitting application:", error);
            setSubmitStatus({ type: "error", message: error.response?.data?.error || "Failed to submit application" });
        } finally {
            setLoading(false);
        }
    };

    // Prevent Enter key from submitting the form
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    // Filter positions by department
    const filteredPositions = formData.department_id
        ? positions.filter((pos) => pos.department_id === Number(formData.department_id))
        : positions;

    return (
        <div className="max-w-full mx-auto p-6 bg-gradient-to-br from-white to-white min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8">
                <span className="text-orange-500">Job</span>{' '}
                <span className="text-sky-900">Application Form</span>
            </h1>
            {/* Progress Bar */}

            {/* Mobile View */}
            <div className="mb-3 overflow-x-auto lg:hidden">
                <div className="flex items-start min-w-[300px] space-x-2">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center min-w-[80px] h-28 justify-start">
                                {/* icon อยู่บน */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step.id ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                                    {step.id}
                                </div>
                                {/* ข้อความอยู่ด้านล่าง */}
                                <p className="text-sm font-medium text-center break-words mt-2 text-gray-500">
                                    {step.name}
                                </p>
                            </div>

                            {/* Connector line */}
                            {index !== steps.length - 1 && (
                                <div className={`flex-1 h-1 mt-5 ${currentStep > step.id ? "bg-orange-500" : "bg-gray-300"}`}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>


            {/* Desktop View */}
            <div className="mb-8 hidden lg:flex">
                <div className="flex items-center w-full">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center min-w-[100px]">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step.id ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                                    {step.id}
                                </div>
                                <p className={`mt-2 text-sm font-medium text-center ${currentStep >= step.id ? "text-orange-600" : "text-gray-500"}`}>
                                    {step.name}
                                </p>
                            </div>
                            {index !== steps.length - 1 && (
                                <div className={`flex-1 h-1 mt-8 ${currentStep > step.id ? "bg-orange-500" : "bg-gray-300"}`}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>


            {fetchError && (
                <div className="p-4 mb-6 rounded-xl text-center bg-red-100 text-red-700">{fetchError}</div>
            )}
            {submitStatus && (
                <div
                    className={`p-4 mb-6 rounded-xl text-center ${submitStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                >
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    placeholder="Enter your full name"
                                    aria-label="Full Name"
                                />
                                {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Login Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    name="login_email"
                                    value={formData.login_email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required
                                    disabled={!!user?.primaryEmailAddress}
                                    placeholder="Enter your email"
                                    aria-label="Login Email"
                                />
                                {errors.login_email && <p className="text-red-500 text-xs mt-1">{errors.login_email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department <span className="text-red-500">*</span></label>
                                <select
                                    name="department_id"
                                    value={formData.department_id}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required
                                    disabled={!!applied_position_id}
                                    aria-label="Department"
                                >
                                    <option value="">Select a department</option>
                                    {departments.length > 0 ? (
                                        departments.map((dept) => (
                                            <option key={dept.dept_id} value={dept.dept_id}>
                                                {dept.dept_name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="none" disabled>No departments available</option>
                                    )}
                                </select>
                                {errors.department_id && <p className="text-red-500 text-xs mt-1">{errors.department_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Position Applied <span className="text-red-500">*</span></label>
                                <select
                                    name="applied_position_id"
                                    value={formData.applied_position_id}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required

                                    aria-label="Position Applied"
                                    disabled={!formData.department_id}
                                >
                                    <option value="">Select a position</option>
                                    {filteredPositions.length > 0 ? (
                                        filteredPositions.map((pos) => (
                                            <option key={pos.position_id} value={pos.position_id}>
                                                {pos.position_title}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="none" disabled>No positions available</option>
                                    )}
                                </select>
                                {!formData.department_id && (
                                    <p className="text-slate-700 text-xs mt-1">
                                        Please select a Department* before choosing a position.
                                    </p>
                                )}
                                {errors.applied_position_id && (
                                    <p className="text-red-500 text-xs mt-1">{errors.applied_position_id}</p>
                                )}
                                {formData.department_id && filteredPositions.length === 0 && (
                                    <p className="text-red-500 text-xs mt-1">
                                        No positions available for the selected department.
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary "KIP" <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="expected_salary"
                                    value={formData.expected_salary}
                                    onChange={handleSalaryChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    placeholder="Enter expected salary"
                                />

                                {errors.expected_salary && <p className="text-red-500 text-xs mt-1">{errors.expected_salary}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={formData.date_of_birth}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white"
                                    required
                                    aria-label="Date of Birth"
                                />
                                {errors.date_of_birth && <p className="text-red-500 text-xs mt-1">{errors.date_of_birth}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    placeholder="Enter your nationality"
                                    aria-label="Nationality"
                                />
                                {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status <span className="text-red-500">*</span></label>
                                <select
                                    name="marital_status"
                                    value={formData.marital_status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white text-gray-700"
                                    required
                                    aria-label="Marital Status"
                                >
                                    <option value="">Select status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                                {errors.marital_status && <p className="text-red-500 text-xs mt-1">{errors.marital_status}</p>}
                            </div>
                            {formData.marital_status === "Married" && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Children <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            name="number_of_children"
                                            value={formData.number_of_children}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                            required
                                            min="0"
                                            placeholder="Enter number of children"
                                            aria-label="Number of Children"
                                        />
                                        {errors.number_of_children && (
                                            <p className="text-red-500 text-xs mt-1">{errors.number_of_children}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="spouse_name"
                                            value={formData.spouse_name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                            required
                                            placeholder="Enter spouse name"
                                            aria-label="Spouse Name"
                                        />
                                        {errors.spouse_name && <p className="text-red-500 text-xs mt-1">{errors.spouse_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Occupation <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="spouse_occupation"
                                            value={formData.spouse_occupation}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                            required
                                            placeholder="Enter spouse occupation"
                                            aria-label="Spouse Occupation"
                                        />
                                        {errors.spouse_occupation && (
                                            <p className="text-red-500 text-xs mt-1">{errors.spouse_occupation}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Workplace <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="spouse_workplace"
                                            value={formData.spouse_workplace}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                            required
                                            placeholder="Enter spouse workplace"
                                            aria-label="Spouse Workplace"
                                        />
                                        {errors.spouse_workplace && (
                                            <p className="text-red-500 text-xs mt-1">{errors.spouse_workplace}</p>
                                        )}
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number, EX: 02555xxxxx <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    placeholder="Enter phone number"
                                    aria-label="Phone Number"
                                />
                                {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    placeholder="Enter contact email"
                                    aria-label="Email"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Address <span className="text-red-500">*</span></label>
                                <textarea
                                    name="current_address"
                                    value={formData.current_address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    rows="3"
                                    placeholder="Enter your current address"
                                    aria-label="Current Address"
                                />
                                {errors.current_address && <p className="text-red-500 text-xs mt-1">{errors.current_address}</p>}
                            </div>
                            <div >
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Language Skills <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-gray-500 mb-2">
                                    Example: English – Fluent (Speaking, Writing, Reading), Lao – Native, Japanese – Basic
                                </p>
                                <textarea
                                    name="language_skills"
                                    value={formData.language_skills}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    rows="3"
                                    placeholder="List your language skills"
                                    aria-label="Language Skills"
                                />
                                {errors.language_skills && <p className="text-red-500 text-xs mt-1">{errors.language_skills}</p>}
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Computer Skill Level <span className="text-red-500">* (Select one)</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                                    {levels.map((level) => (
                                        <div key={level} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`computer_skill_level_${level}`}
                                                checked={formData.computer_skill_level === level}
                                                onCheckedChange={() => handleSelect(level)}
                                                className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                                aria-label={`Computer Skill Level: ${level}`}
                                            />
                                            <label
                                                htmlFor={`computer_skill_level_${level}`}
                                                className="text-sm text-gray-700 font-medium"
                                            >
                                                {level}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.computer_skill_level && (
                                    <p className="text-red-500 text-xs mt-2">{errors.computer_skill_level}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Emergency Contact */}
                {currentStep === 2 && (
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Emergency Contact</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="emergency_name"
                                    value={formData.emergency_name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    placeholder="Enter emergency contact name"
                                    aria-label="Emergency Contact Name"
                                />
                                {errors.emergency_name && <p className="text-red-500 text-xs mt-1">{errors.emergency_name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="emergency_relationship"
                                    value={formData.emergency_relationship}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    placeholder="Enter relationship"
                                    aria-label="Emergency Contact Relationship"
                                />
                                {errors.emergency_relationship && (
                                    <p className="text-red-500 text-xs mt-1">{errors.emergency_relationship}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number, EX: 02555xxxxx <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="emergency_phone"
                                    value={formData.emergency_phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    placeholder="Enter phone number"
                                    aria-label="Emergency Contact Phone Number"
                                />
                                {errors.emergency_phone && (
                                    <p className="text-red-500 text-xs mt-1">{errors.emergency_phone}</p>
                                )}
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                                <textarea
                                    name="emergency_address"
                                    value={formData.emergency_address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                    required
                                    rows="4"
                                    placeholder="Enter emergency contact address"
                                    aria-label="Emergency Contact Address"
                                />
                                {errors.emergency_address && (
                                    <p className="text-red-500 text-xs mt-1">{errors.emergency_address}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Education */}
                {currentStep === 3 && (
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-between">
                            Education
                            <button
                                type="button"
                                onClick={addEducation}
                                className="text-orange-500 hover:text-orange-600 flex items-center gap-1 transition duration-200"
                            >
                                <PlusCircle size={20} />
                                Add Education
                            </button>
                        </h2>
                        {errors.educations && <p className="text-red-500 text-xs mb-4">{errors.educations}</p>}
                        {educations.map((edu, index) => (
                            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Qualification <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={edu.qualification}
                                            onChange={(e) => handleEducationChange(index, "qualification", e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                            required
                                            placeholder="Enter qualification"
                                            aria-label={`Qualification ${index + 1}`}
                                        />
                                        {errors[`educations[${index}].qualification`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`educations[${index}].qualification`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Major <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={edu.major}
                                            onChange={(e) => handleEducationChange(index, "major", e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                            placeholder="Enter major"
                                            aria-label={`Major ${index + 1}`}
                                        />
                                        {errors[`educations[${index}].major`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`educations[${index}].major`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={edu.institution_name}
                                            onChange={(e) => handleEducationChange(index, "institution_name", e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                            required
                                            placeholder="Enter institution name"
                                            aria-label={`Institution Name ${index + 1}`}
                                        />
                                        {errors[`educations[${index}].institution_name`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`educations[${index}].institution_name`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            value={edu.graduation_year}
                                            onChange={(e) => handleEducationChange(index, "graduation_year", e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                            min="1900"
                                            max="2100"
                                            placeholder="Enter graduation year"
                                            aria-label={`Graduation Year ${index + 1}`}
                                        />
                                        {errors[`educations[${index}].graduation_year`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`educations[${index}].graduation_year`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">GPA <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            value={edu.gpa}
                                            onChange={(e) => handleEducationChange(index, "gpa", e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-gray-400"
                                            step="0.01"
                                            min="0"
                                            max="4"
                                            placeholder="Enter GPA"
                                            aria-label={`GPA ${index + 1}`}
                                        />
                                        {errors[`educations[${index}].gpa`] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[`educations[${index}].gpa`]}</p>
                                        )}
                                    </div>
                                </div>
                                {educations.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeEducation(index)}
                                        className="mt-4 text-red-500 hover:text-red-600 flex items-center gap-1 transition duration-200"
                                    >
                                        <Trash2 size={20} />
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Step 4: Documents */}
                {currentStep === 4 && (
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Documents</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CV (PDF, DOC, DOCX) <span className="text-red-500">*</span></label>
                                <input
                                    type="file"
                                    ref={cvInputRef}
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => handleFileChange(e, "cv")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                    required
                                    aria-label="Upload CV"
                                />
                                {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo (JPEG, PNG, etc.) <span className="text-red-500">*</span></label>
                                <input
                                    type="file"
                                    ref={photoInputRef}
                                    accept=".jpeg,.jpg,.png,.gif,.webp,.svg"
                                    onChange={(e) => handleFileChange(e, "photo")}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                    required
                                    aria-label="Upload Photo"
                                />
                                {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                                {photoPreview && (
                                    <div className="mt-4 relative">
                                        <img
                                            src={photoPreview}
                                            alt="Photo preview"
                                            className="max-w-full h-auto rounded-lg border border-gray-300"
                                            style={{ maxHeight: "200px" }}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemovePhoto}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition duration-200"
                                            aria-label="Remove photo"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={handlePrevious}
                            className="inline-flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 font-semibold"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Previous
                        </button>
                    )}

                    <div className="ml-auto">
                        {currentStep < steps.length ? (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNext();
                                }}
                                className={`inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={loading}
                            >
                                Next
                                <ArrowRight size={20} className="ml-2" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading || !positions.length}
                                className={`inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold ${loading || !positions.length ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {loading && <Loader2 className="animate-spin mr-2" size={20} />}
                                Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Applicant;