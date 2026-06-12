Recruitment & Marketing API Portal
ນີ້ແມ່ນລະບົບ Backend API ສໍາລັບຈັດການຂໍ້ມູນAdmin web (News, Promotions, Sliders), ລະບົບຊັບພະຍາກອນມະນຸດ (HR, Job Posts, Departments) ແລະ ລະບົບຮັບສະໝັກພະນັກງານ (Applicant Tracking).

🛠 Tech Stack
Runtime: Node.js

Framework: Express.js

Database: PostgreSQL (via pg pool)

Authentication: JWT (Custom Admin Auth) & Clerk SDK (for Applicants)

File Upload: Multer

📂 Project Structure (Routes Overview)
ລະບົບແບ່ງອອກເປັນ 4 ພາກສ່ວນຫຼັກຕາມ Routes:

1. Marketing & Content (/api/marketing)
ຈັດການເນື້ອຫາເທິງໜ້າເວັບໄຊທ໌:

Slider/Popup: ຮູບພາບ Slideshow ແລະ ປັອບອັບໂປຣໂມຊັນ.

News & Promotion: ຈັດການຂ່າວສານ ແລະ ໂປຣໂມຊັນຕ່າງໆ.

FAQ: ຄຳຖາມທີ່ພົບເລື້ອຍ.

Middleware: ຕ້ອງຜ່ານ authCheck ແລະ marketingCheck.

2. HR Management (/api/hr)
ຈັດການໂຄງສ້າງອົງກອນ ແລະ ປະກາດຮັບສະໝັກງານ:

Department: ຈັດການຜະແນກ.

Position: ຈັດການຕຳແໜ່ງງານ.

Job Post: ສ້າງ ແລະ ແກ້ໄຂປະກາດຮັບສະໝັກງານ.

Middleware: ຕ້ອງຜ່ານ authCheck ແລະ hrCheck.

3. Authentication (/api/auth)
Admin Login/Register: ລະບົບ Login ສໍາລັບ Admin ໂດຍໃຊ້ JWT.

Current User: ກວດສອບສະຖານະ User ທີ່ກຳລັງ Login.

4. Applicant System (/api/applicants)
Public/User: ສົ່ງໃບສະໝັກ (ໃຊ້ Clerk Auth).

Manager/HR: ກວດສອບໃບສະໝັກ, ອັບເດດ Status (Interview, Confirmed) ແລະ ລະບົບແຈ້ງເຕືອນ Unread.
