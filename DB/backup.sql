--
-- PostgreSQL database dump
--

\restrict XS8FuGeDbGwpjDcjPrr1uNuy51Bt6r8peGvAqMcUHvEsQPrqhHTYT0rvt1oNrCy

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)

-- Started on 2025-11-10 09:17:54 +07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16390)
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    admin_id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role_name character varying(50) NOT NULL,
    dept_id integer,
    CONSTRAINT admins_role_name_check CHECK (((role_name)::text = ANY ((ARRAY['hr'::character varying, 'marketing'::character varying, 'manager'::character varying])::text[])))
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16389)
-- Name: admins_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_admin_id_seq OWNER TO postgres;

--
-- TOC entry 3576 (class 0 OID 0)
-- Dependencies: 215
-- Name: admins_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_admin_id_seq OWNED BY public.admins.admin_id;


--
-- TOC entry 226 (class 1259 OID 16452)
-- Name: applicant_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.applicant_details (
    detail_id integer NOT NULL,
    applicant_id integer NOT NULL,
    emergency_name character varying(150),
    emergency_relationship character varying(50),
    emergency_phone character varying(20),
    emergency_address text,
    cv_path character varying(255),
    photo_path character varying(255)
);


ALTER TABLE public.applicant_details OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16451)
-- Name: applicant_details_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.applicant_details_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.applicant_details_detail_id_seq OWNER TO postgres;

--
-- TOC entry 3577 (class 0 OID 0)
-- Dependencies: 225
-- Name: applicant_details_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.applicant_details_detail_id_seq OWNED BY public.applicant_details.detail_id;


--
-- TOC entry 222 (class 1259 OID 16422)
-- Name: applicants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.applicants (
    applicant_id integer NOT NULL,
    applied_position_id integer NOT NULL,
    expected_salary character varying(50),
    fullname character varying(150) NOT NULL,
    date_of_birth date,
    nationality character varying(50),
    marital_status character varying(20),
    spouse_name character varying(150),
    spouse_occupation character varying(100),
    spouse_workplace character varying(150),
    number_of_children integer DEFAULT 0,
    phone_number character varying(20),
    email character varying(100),
    current_address text,
    language_skills text,
    computer_skills text,
    login_email character varying(100) NOT NULL,
    application_status character varying(50) DEFAULT 'Pending'::character varying NOT NULL,
    manager_read boolean DEFAULT false,
    hr_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT applicants_marital_status_check CHECK (((marital_status)::text = ANY ((ARRAY['Single'::character varying, 'Married'::character varying])::text[])))
);


ALTER TABLE public.applicants OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16421)
-- Name: applicants_applicant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.applicants_applicant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.applicants_applicant_id_seq OWNER TO postgres;

--
-- TOC entry 3578 (class 0 OID 0)
-- Dependencies: 221
-- Name: applicants_applicant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.applicants_applicant_id_seq OWNED BY public.applicants.applicant_id;


--
-- TOC entry 218 (class 1259 OID 16400)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    dept_id integer NOT NULL,
    dept_name character varying(100) NOT NULL
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16399)
-- Name: departments_dept_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_dept_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_dept_id_seq OWNER TO postgres;

--
-- TOC entry 3579 (class 0 OID 0)
-- Dependencies: 217
-- Name: departments_dept_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_dept_id_seq OWNED BY public.departments.dept_id;


--
-- TOC entry 224 (class 1259 OID 16440)
-- Name: educations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.educations (
    edu_id integer NOT NULL,
    applicant_id integer NOT NULL,
    qualification character varying(100),
    major character varying(100),
    institution_name character varying(150),
    graduation_year smallint,
    gpa numeric(3,2)
);


ALTER TABLE public.educations OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16439)
-- Name: educations_edu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.educations_edu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.educations_edu_id_seq OWNER TO postgres;

--
-- TOC entry 3580 (class 0 OID 0)
-- Dependencies: 223
-- Name: educations_edu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.educations_edu_id_seq OWNED BY public.educations.edu_id;


--
-- TOC entry 238 (class 1259 OID 16537)
-- Name: faqs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faqs (
    id integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL
);


ALTER TABLE public.faqs OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16536)
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faqs_id_seq OWNER TO postgres;

--
-- TOC entry 3581 (class 0 OID 0)
-- Dependencies: 237
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- TOC entry 230 (class 1259 OID 16497)
-- Name: imagepopup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imagepopup (
    id integer NOT NULL,
    filepath character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.imagepopup OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16496)
-- Name: imagepopup_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imagepopup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imagepopup_id_seq OWNER TO postgres;

--
-- TOC entry 3582 (class 0 OID 0)
-- Dependencies: 229
-- Name: imagepopup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.imagepopup_id_seq OWNED BY public.imagepopup.id;


--
-- TOC entry 228 (class 1259 OID 16471)
-- Name: job_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_posts (
    post_id integer NOT NULL,
    position_id integer,
    title character varying(255) NOT NULL,
    description text,
    quantity integer DEFAULT 1,
    status character varying(10) DEFAULT 'open'::character varying,
    start_date date NOT NULL,
    end_date date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT job_posts_status_check CHECK (((status)::text = ANY ((ARRAY['open'::character varying, 'closed'::character varying])::text[])))
);


ALTER TABLE public.job_posts OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16470)
-- Name: job_posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.job_posts_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.job_posts_post_id_seq OWNER TO postgres;

--
-- TOC entry 3583 (class 0 OID 0)
-- Dependencies: 227
-- Name: job_posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.job_posts_post_id_seq OWNED BY public.job_posts.post_id;


--
-- TOC entry 234 (class 1259 OID 16515)
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    summary text,
    image_url character varying(255),
    type character varying(10) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT news_type_check CHECK (((type)::text = ANY ((ARRAY['news'::character varying, 'event'::character varying])::text[])))
);


ALTER TABLE public.news OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16514)
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.news_id_seq OWNER TO postgres;

--
-- TOC entry 3584 (class 0 OID 0)
-- Dependencies: 233
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- TOC entry 220 (class 1259 OID 16409)
-- Name: positions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.positions (
    position_id integer NOT NULL,
    dept_id integer NOT NULL,
    position_title character varying(100) NOT NULL,
    is_open boolean DEFAULT true
);


ALTER TABLE public.positions OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16408)
-- Name: positions_position_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.positions_position_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.positions_position_id_seq OWNER TO postgres;

--
-- TOC entry 3585 (class 0 OID 0)
-- Dependencies: 219
-- Name: positions_position_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.positions_position_id_seq OWNED BY public.positions.position_id;


--
-- TOC entry 236 (class 1259 OID 16526)
-- Name: promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotions (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    start_date date,
    end_date date,
    image_url character varying(255),
    status character varying(20) DEFAULT 'active'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.promotions OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16525)
-- Name: promotions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promotions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promotions_id_seq OWNER TO postgres;

--
-- TOC entry 3586 (class 0 OID 0)
-- Dependencies: 235
-- Name: promotions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promotions_id_seq OWNED BY public.promotions.id;


--
-- TOC entry 232 (class 1259 OID 16505)
-- Name: sliders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sliders (
    id integer NOT NULL,
    image_url character varying(255) NOT NULL,
    title character varying(255),
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sliders OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16504)
-- Name: sliders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sliders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sliders_id_seq OWNER TO postgres;

--
-- TOC entry 3587 (class 0 OID 0)
-- Dependencies: 231
-- Name: sliders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sliders_id_seq OWNED BY public.sliders.id;


--
-- TOC entry 3338 (class 2604 OID 16393)
-- Name: admins admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN admin_id SET DEFAULT nextval('public.admins_admin_id_seq'::regclass);


--
-- TOC entry 3349 (class 2604 OID 16455)
-- Name: applicant_details detail_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicant_details ALTER COLUMN detail_id SET DEFAULT nextval('public.applicant_details_detail_id_seq'::regclass);


--
-- TOC entry 3342 (class 2604 OID 16425)
-- Name: applicants applicant_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicants ALTER COLUMN applicant_id SET DEFAULT nextval('public.applicants_applicant_id_seq'::regclass);


--
-- TOC entry 3339 (class 2604 OID 16403)
-- Name: departments dept_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN dept_id SET DEFAULT nextval('public.departments_dept_id_seq'::regclass);


--
-- TOC entry 3348 (class 2604 OID 16443)
-- Name: educations edu_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educations ALTER COLUMN edu_id SET DEFAULT nextval('public.educations_edu_id_seq'::regclass);


--
-- TOC entry 3363 (class 2604 OID 16540)
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- TOC entry 3354 (class 2604 OID 16500)
-- Name: imagepopup id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagepopup ALTER COLUMN id SET DEFAULT nextval('public.imagepopup_id_seq'::regclass);


--
-- TOC entry 3350 (class 2604 OID 16474)
-- Name: job_posts post_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_posts ALTER COLUMN post_id SET DEFAULT nextval('public.job_posts_post_id_seq'::regclass);


--
-- TOC entry 3358 (class 2604 OID 16518)
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- TOC entry 3340 (class 2604 OID 16412)
-- Name: positions position_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions ALTER COLUMN position_id SET DEFAULT nextval('public.positions_position_id_seq'::regclass);


--
-- TOC entry 3360 (class 2604 OID 16529)
-- Name: promotions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions ALTER COLUMN id SET DEFAULT nextval('public.promotions_id_seq'::regclass);


--
-- TOC entry 3356 (class 2604 OID 16508)
-- Name: sliders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sliders ALTER COLUMN id SET DEFAULT nextval('public.sliders_id_seq'::regclass);


--
-- TOC entry 3548 (class 0 OID 16390)
-- Dependencies: 216
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (admin_id, username, password, role_name, dept_id) FROM stdin;
1	admin01	$2b$10$WdjRDxKBky2cdGpDsyVUMurOJnzi2e05C8n7vCa.BiildqOXB5w.m	hr	\N
3	admin03	$2b$10$htE9xyhMdEMMHvmblxLXN.dSKMUjAiJsGC.Vfyl4QDOlIN9XQtUpS	marketing	\N
4	manager_it	$2b$10$KgXEoCo4caLqHP2gKfROsuU4UxY8oSM9GCD/DzlD.YuI1GmvCDqoi	manager	2
5	manager_marketing	$2b$10$fpDZ9g/Z4Q3zmwqjvxijausQQ8q2XlIxLBXhx0QUrdqsD1l53zB1S	manager	3
6	manager_accounting	$2b$10$7adLWAaJK5EufJsY3lAJ.eLFefOA.9CcquO5pcIX67ID3kD2Rt4d6	manager	4
7	manager_credit	$2b$10$/Q.KMhvYv01tq64eIWj7buiy08KZm7igP/IxzvtGEVDI28Dhbmxiu	manager	5
8	manager_hr	$2b$10$bHjUspwQZ29ghuMrgJBQEebpS2wxenUxgLLm0lBWGEoUZ28kHijym	manager	6
9	manager_finance	$2b$10$eKp/2zAM5Ua7qaLgp.rMNeQ1oSd3EPo4DfxpyDHW7aww3I21ukoZ2	manager	7
10	manager_administration	$2b$10$ZJr9MUKqkdItH0W6Ljcb.eaMzpi9IDLq/3I2HMORhUxE5hoAL7BYO	manager	8
11	manager_risk_management	$2b$10$zHn.SlhKnyx6E77wgIKhq.5uqxPIDhYmaX415Dwx80t.Gsul5Dq.6	manager	9
12	manager_customer_service	$2b$10$Y28uXJD8SOYCUBEGS7hExe1xUud2JwzUEkAnk6r0qGhkXvPHnFUFS	manager	10
13	manager_management	$2b$10$MYZTxdmBuHq1j0dsg.LM5uGNoZhlrlOsB1ODae.83Dn5dj2/gxZ0i	manager	11
14	manager_operation	$2b$10$wAzOEl0GICZxmYzokGu14ONm7auNVkZJB/pN7ZSC3RiHFUGiduqRO	manager	12
\.


--
-- TOC entry 3558 (class 0 OID 16452)
-- Dependencies: 226
-- Data for Name: applicant_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.applicant_details (detail_id, applicant_id, emergency_name, emergency_relationship, emergency_phone, emergency_address, cv_path, photo_path) FROM stdin;
1	1	tonyy	dad	0205200314	erg erg;relg	/file/cv/undefined	/file/photo/undefined
2	4	ertpore	eortpre	02022072633	woporegpreog	/file/cv/d33840c148ccf04e290d65205a64b502	/file/photo/db1762ab88ae9414ed69f094128da46c
3	5	tonyy	dad	2052000314	jfwkjfnwkjfw	/file/cv/1760507659026-970143498.pdf	/file/photo/1760507659042-870449414.png
4	8	tonyy	Dad	2022012018	Vientain	/file/cv/1760508416861-19072429.pdf	/file/photo/1760508416880-358128489.png
5	12	tonyy	\N	\N	\N	/file/cv/1760511454445-222875166.pdf	/file/photo/1760511454464-265027419.png
6	24	\N	\N	\N	\N	/file/cv/1760516217219-168193021.pdf	/file/photo/1760516217233-833070247.png
7	25	tonyy	sadsda	0205100132	asdsadas	/file/cv/1760600212723-562967846.pdf	/file/photo/1760600212738-638669047.png
8	26	nukai	Dad	02053000123	Vientian	/file/cv/1760605458686-572518305.pdf	/file/photo/1760605458693-757491462.png
9	27	tonyy	dad	02052000314	vt	/file/cv/1760606683752-545606357.pdf	/file/photo/1760606683757-379890343.png
10	28	tonyy	dad	02052003146	rtgrtgtrg	/file/cv/1760687402842-466461503.pdf	/file/photo/1760687402850-727523280.jpeg
11	30	dad	dad	02052000314	VT	/file/cv/1760948819845-152119825.pdf	/file/photo/1760948819845-397499575.png
12	31	song	dad	02056680247	no	/file/cv/1761021700343-137154147.pdf	/file/photo/1761021700358-244615492.jpeg
13	32	tonyy	dad	02052000314	ewrwerew	/file/cv/1761488183164-66249151.pdf	/file/photo/1761488183172-666850595.jpeg
14	33	tonyy	dad	2056565656	ฟหหฟปฟ	/file/cv/1761548825527-320416928.pdf	/file/photo/1761548825538-309545521.jpeg
15	34	Noukai	dad	2022012018	Ngongphaya	/file/cv/1761549783618-14453425.pdf	/file/photo/1761549783619-753366178.png
\.


--
-- TOC entry 3554 (class 0 OID 16422)
-- Dependencies: 222
-- Data for Name: applicants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.applicants (applicant_id, applied_position_id, expected_salary, fullname, date_of_birth, nationality, marital_status, spouse_name, spouse_occupation, spouse_workplace, number_of_children, phone_number, email, current_address, language_skills, computer_skills, login_email, application_status, manager_read, hr_read, created_at) FROM stdin;
27	5	324234	Thanaxay Latsavong	2025-08-06	Lao	Single	\N	\N	\N	0	45435435	thonylardsavong09@gmail.com	vt	English – Fluent (Speaking, Writing, Reading), Thai – Native, Japanese – Basic	Average	tony.lsv@icloud.com	Invited_for_Interview	t	t	2025-10-16 22:58:15.540164
25	6	500000	Thanaxay	2025-09-09	rotrot	Single	\N	\N	\N	0	02012345678	thonylardsavong09@gmail.com	sada	asd	Excellent, Average, Good	thonylardsavong09@gmail.com	Pending	f	t	2025-10-16 22:58:15.540164
24	3	324234	Thanaxay Latsavong	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	\N	\N	thonylardsavong09@gmail.com	Rejected	f	t	2025-10-16 22:58:15.540164
6	6	324234	Thanaxay Latsavong	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	\N	\N	thonylardsavong09@gmail.com	Invited_for_Interview	f	t	2025-10-16 22:58:15.540164
8	6	324234	Thanaxay Latsavong	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	\N	\N	thonylardsavong09@gmail.com	Pending	f	t	2025-10-16 22:58:15.540164
12	3	\N	Thanaxay Latsavong	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	\N	\N	thonylardsavong09@gmail.com	Pending	t	t	2025-10-16 22:58:15.540164
4	4	324234	tonyyy	2025-09-16	rotrot	\N	\N	\N	\N	49093403	43433455435435	thonylardsavong09@gmail.com	345435retrte	er;tre;	oretoet	thonylardsavong09@gmail.com	Approved	f	t	2025-10-16 22:58:15.540164
26	4	1000000	yoy	2025-09-15	loas	Single	\N	\N	\N	0	1	thonyardsavong09@gmail.com	vt	goood	Very Poor	tony.lsv@icloud.com	Approved	t	t	2025-10-16 22:58:15.540164
34	5	11,000,000	ທະນາໄຊ ລາດຊະວົງ	2003-09-23	Lao	Single	\N	\N	\N	0	2052000314	thonylardsavong09@gmail.com	Nongphaya	Row	Very Poor	thonylardsavong09@gmail.com	Invited_for_Interview	t	t	2025-10-27 14:23:03.626566
28	2	4332432432	athifd	2025-09-04	Lao	Married	ertekrt	yujyjyujy	kretbret	6	5000314	thonylardsavong09@gmail.com	ergfge	gtgrtgtrgr	Poor	tony.lsv@icloud.com	Pending	t	t	2025-10-17 14:50:02.859348
7	6	324234	Thanaxay Latsavong	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	\N	\N	thonylardsavong09@gmail.com	Invited_for_Interview	f	t	2025-10-16 22:58:15.540164
32	6	324234	Thanaxay Latsavong	2025-10-02	ๆไฟกฟก	Married	ertekrt	erbtretre	ujyuj	2023	5000314	thonylardsavong09@gmail.com	weweewewfwfw	wefwef	Average	thonylardsavong09@gmail.com	Invited_for_Interview	f	t	2025-10-26 21:16:23.18143
29	2	4332432432	athifd	2025-09-04	Lao	Married	ertekrt	yujyjyujy	kretbret	6	5000314	thonylardsavong09@gmail.com	ergfge	gtgrtgtrgr	Poor	tony.lsv@icloud.com	Invited_for_Interview	t	t	2025-10-17 14:50:02.859348
31	4	20000000	Today	2005-04-21	Lao	Single	\N	\N	\N	0	02056680247	sonekvl9900@gamil.com	no	no	Excellent	sonekvl9900@gmail.com	Approved	f	t	2025-10-21 11:41:40.370732
33	4	20,000,000	Thanaxay Latsavong	2025-07-28	rotrot	Single	\N	\N	\N	0	2052000314	thonylardsavong09@gmail.com	ำดำเดำพพำพ	ำพดำดพำดำด	Average	thonylardsavong09@gmail.com	Invited_for_Interview	f	t	2025-10-27 14:07:05.546234
30	6	10000000	Thanaxay Latsavong  0099	2025-09-08	rotrot	Single	\N	\N	\N	0	45435435	thonylavong09@gmail.com	VT	 English – Fluent (Speaking, Writing, Reading), Lao – Native, Japanese – Basic	Poor	tony.lsv@icloud.com	Invited_for_Interview	f	t	2025-10-20 15:26:59.846776
1	3	4332432432	tony	2025-09-09	rotrot	Married	34;re	erlfe	relfe	4	23	thonylardsavong09@gmail.com	;lremgf;lregm	lerg;melg	re ge	thonylardsavong09@gmail.com	Pending	f	f	2025-10-16 22:58:15.540164
5	6	324234	Thanaxay Latsavong	2025-06-10	rotrot	Married	ertekrt	yujyjyujy	ujyuj	1	5000314	thonylardsavong09@gmail.com	jfe wkjfrwjfrkfwkjf	ewfnewlfnew	kffjnjf	thonylardsavong09@gmail.com	Pending	f	f	2025-10-16 22:58:15.540164
\.


--
-- TOC entry 3550 (class 0 OID 16400)
-- Dependencies: 218
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (dept_id, dept_name) FROM stdin;
3	Marketing
5	Credit
2	IT
6	HR
4	Accounting
7	Finance
8	Administration
11	Management
12	Operation
9	Risk_Management
10	Customer_Service
\.


--
-- TOC entry 3556 (class 0 OID 16440)
-- Dependencies: 224
-- Data for Name: educations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.educations (edu_id, applicant_id, qualification, major, institution_name, graduation_year, gpa) FROM stdin;
1	1	;ler;lger	;lergmr	;lregm;lr	2025	3.35
2	4	dlkefew	oewog	welkfnlewf	2024	2.22
3	4	mrpoewprw	remforew	oewpowe	2015	2.09
4	5	fwmfewfmew	wfemewomfew	wpemfwo	2012	3.04
5	8	epopopovv	programing	wfwf	2020	2.12
6	12	เเำพ	\N	ำพเ	\N	\N
7	24	sasa	\N	2052000314	\N	\N
8	25	knlkn	ddewdwed	wedwed	\N	\N
9	26	nynuu	wrrewerwe	sasdsd	2025	2.00
10	27	Mrsr	sadad	wewedew	2020	2.30
11	28	6yhth	ythth	tyhyth	1983	3.43
12	30	Master's	com	Mz	2023	4.00
13	31	n	m	m	2000	4.00
14	32	rrgerg	regregr	reg	2023	3.23
15	33	fefre	rerefer	ujyujyu	2000	3.00
16	34	Dr	Compurter	MZ loas	2024	4.00
\.


--
-- TOC entry 3570 (class 0 OID 16537)
-- Dependencies: 238
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faqs (id, question, answer) FROM stdin;
5	ສະຖາບັນການເງິນ ຈຸລະພາກທີ່ຮັບຝາກເງິນ ຟີນ້າ ຈຳກັດ ແມ່ນຫຍັງ ?	ຟີນ້າ ແມ່ນການເງິນຈຸລະພາກທີ່ຮັບຝາກເງິນ ເຊິ່ງເປັນບໍລິສັດ FINTECH (ບໍລິການດ້ານການເງິນຜ່ານທາງແອັບພລິເຄຊັນເທິງມືຖື). ມີບໍລິການທາງດ້ານການເງິນ ບໍ່ວ່າຈະເປັນເງິນຝາກ ແລະ ສິນເຊື່ອເງິນກູ້ ທີ່ສາມາດເຂົ້າເຖິງການບໍລິການໄດ້ຍ່າງສະດວກສະບາຍ.\n
7	ດອກເບ້ຍເງິນຝາກປະຈຳໄດ້ທໍ່ໃດ ?	ເປີດບັນຊີເງິນຝາກປະຈຳ ດ້ວຍດອກເບ້ຍສູງເຖິງ 12% ຕໍ່ປີ
8	ຖ້າຢືມ 50​ ລ້ານ  1 ປີ ຕ້ອງຈ່າຍເດືອນລະເທົ່າໃດ ?	ຖ້າຢືມ 50​ ລ້ານ  1 ປີ ຕ້ອງຈ່າຍເດືອນລະ 4,900,000 ກີບ
9	ຖ້າຢືມ 30 ລ້ານ  1 ປີ ຕ້ອງຈ່າຍເດືອນລະເທົ່າໃດ ?	ຖ້າຢືມ 30 ລ້ານ  1 ປີ ຕ້ອງຈ່າຍເດືອນລະ 2.900.000 ກີບ
6	ເງິນກູ້ດອກເບ້ຍທໍ່ໃດ ?	💰 ກູ້ໄດ້ສູງສຸດ 5 ເທົ່າຂອງເງິນເດືອນ\n💸 ຫຼື ບໍ່ເກີນ 50 ລ້ານກີບ\n🎉 ບໍ່ຕ້ອງມີຫລັກຊັບຄ້ຳປະກັນ\n📉 ດອກເບ້ຍພຽງແຕ່ 1.5%\n📆 ກູ້ໄດ້ສູງສຸດເຖິງ 12 ເດືອນ
\.


--
-- TOC entry 3562 (class 0 OID 16497)
-- Dependencies: 230
-- Data for Name: imagepopup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.imagepopup (id, filepath, created_at) FROM stdin;
11	/file/showpopup/1761364757779-486909334.png	2025-10-25 10:59:18.574695
\.


--
-- TOC entry 3560 (class 0 OID 16471)
-- Dependencies: 228
-- Data for Name: job_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_posts (post_id, position_id, title, description, quantity, status, start_date, end_date, created_at) FROM stdin;
2	2	Vido Editer	Potoshop	1	closed	2025-09-29	2025-09-29	2025-10-10 16:32:42.656563
5	5	ggthgfhfhgfhfghhhhhh	dsgfsgfgfg	8	closed	2025-09-19	2025-10-02	2025-10-13 10:13:29.671006
3	3	support wifi, support compurter	senoi	2	open	2025-11-14	2025-11-29	2025-10-10 16:43:27.447266
7	5	jum	mjmumumๅๅๅๅๅๅๅๅๅๅๅๅๅๅๅๅๅๅๅๅๅๅ	3	closed	2025-10-07	2025-10-17	2025-10-13 10:49:29.168626
6	3	tyhyth	yhythyt	1	closed	2025-09-28	2025-10-24	2025-10-13 10:49:01.460703
\.


--
-- TOC entry 3566 (class 0 OID 16515)
-- Dependencies: 234
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news (id, title, content, summary, image_url, type, created_at) FROM stdin;
19	ງານ Singapore Fintech Festival	ຟີນ້າເຂົ້າຮ່ວມທີ່ງານ Singapore Fintech Festival ເປັນງານປະຊຸມດ້ານ Fintech ທີ່ໃຫຍ່ທີ່ສຸດໃນໂລກ ເເລະ ເປັນປີທໍາອິດທີ່ປະເທດລາວມາຮ່ວມງານວາງສະເເດງນະວັດຕະກໍາການເງິນໃຫມ່ ທີ່ນໍາໃຊ້ລະບົບການເງິນແບບດີຈິຕອລ ໃຫ້ບໍລິການ ເປີດບັນຊີເງິນຝາກ, ຝາກເງິນ-ຖອນເງິນ, ໂອນເງິນ, ຊໍາລະເງິນ, ຊໍາລະຄ່າໃບບິນຕ່າງໆ, ໃຫ້ບໍລິການປະກັນໄພ ແລະ ໃຫ້ບໍລິການສິນເຊື່ອຕ່າງໆ ທີ່ສາມາດໃຊ້ບໍລິການດ້ວຍການເປີດບັນຊີໃນແອັບ FINA.\r\n	\N	/file/news/1761360238347-992300964.jpeg	event	2025-10-25 09:43:58.393708
17	Passion	ຜູ້ທີ່ເປັນແຮງບັນດານໃຈໃນການສ້າງ FINA ກໍແມ່ນທຸກຊຸມຊົນໃນປະເທດລາວນີ້ແຫຼະ 😊\r\n	\N	/file/news/1761359930239-713710517.jpeg	news	2025-10-25 09:38:50.25229
20	ບູດ Fina ກັບງານ ຜະລິດຕະພັນລາວ	ພາບບັນຍາກາດ ບູດ Fina ກັບງານ ຜະລິດຕະພັນລາວ\r\nພົບກັບທີມງານ FINA ໄດ້ຕັ້ງແຕ່ມື້ນີ້ ຈົນເຖິງ 8 ຕຸລາ 2025. \r\nມາເປີດບັນຊີ ແລະ ຮັບຄໍາແນະນຳດີໆກ່ຽວກັບການເງິນໄດ້ທີ່ບູດຂອງພວກເຮົາ! 	\N	/file/news/1761360282324-465690738.jpeg	event	2025-10-25 09:44:42.335076
22	ພິທີລົງນາມ ການຊື້ຂາຍຜະລິດຕະພັນບັດນ້ຳມັນ Pluscard ລະຫວ່າງ ບໍລິສັດ ປີໂຕຣລ້ຽມເທຣດດິ້ງ ລາວ ມະຫາຊົນ (PTL) ແລະ ສະຖາບັນການເງິນຈຸລະພາກທີ່ຮັບເງິນຝາກ ຟີນ້າ ຈໍາກັດ (Fina)	ໃນວັນຈັນທີ 12 ພຶດສະພາ 2025 ທີ່ຜ່ານມາ, ໄດ້ມີພິທີລົງນາມ ການຊື້ຂາຍຜະລິດຕະພັນບັດນ້ຳມັນ Pluscard ລະຫວ່າງ ບໍລິສັດ ປີໂຕຣລ້ຽມເທຣດດິ້ງ ລາວ ມະຫາຊົນ (PTL) ແລະ ສະຖາບັນການເງິນຈຸລະພາກທີ່ຮັບເງິນຝາກ ຟີນ້າ ຈໍາກັດ (Fina) ໂດຍມີ:  ທ່ານ ສົມທະວີ ສີບຸນມາ ຮອງຫົວຫນ້າ ກົມຄຸ້ມຄອງສະຖາບັນການເງິນທີ່ບໍ່ແມ່ນທະນາຄານ, ທ່ານ ນາງ ລໍາມອນ ສິມມະໄລວົງ ຮອງຫົວຫນ້າ ກົມຄຸ້ມຄອງລະບົບການຊໍາລະ, ທ່ານ ປະສິດທິເດດ ຫຼວງວິໄລ, ຫົວໜ້າສູນຂໍ້ມູນດິຈິຕ໋ອນ, ກະຊວງເຕັກໂນໂລຊີ ແລະ ການສື່ສານ ,ທ່ານ ຄໍາສອນ ສິດທິໄຊ ຜູ້ອໍານວຍການໃຫຍ່ ບໍລິສັດ ປີໂຕຣລ້ຽມເທຣດດິ້ງ ລາວ ມະຫາຊົນ, ທ່ານ ນາງ ຈັນທະດອມ ເມກສະຫວັນ ຮອງຜູ້ອໍານວຍການ ບໍລິສັດ ປີໂຕຣລ້ຽມເທຣດດິ້ງ ລາວ ມະຫາຊົນ, ທ່ານ ສີລາ ວຽງແກ້ວ ປະທານສະພາບໍລິຫານ ບໍລິສັດ ປີໂຕຣລ້ຽມເທຣດດິ້ງ ລາວ ມະຫາຊົນ, ທ່ານ ອາລຸນແກ້ວ ກິດຕິຄຸນ ປະທານຄະນະກຳມະການດ້ານຍຸດທະສາດ ແລະ ການວາງແຜນ ບໍລິສັດ ພີທີແອວ ໂຮນດິ້ງ ຈຳກັດ, ທ່ານ ນາງ ມະໂນລາ ປະເສີດ ຮອງປະທານກຳມະທິການພົວພັນພາກລັດ ບໍລິສັດ ພີທີແອວ ໂຮນດິ້ງ ຈຳກັດ, ທ່ານ ນາງ ສຸພາພອນ ສວນນະວົງ ຜູ້ອໍານວຍການ ສະຖາບັນການເງິນຈຸລະພາກທີ່ຮັບເງິນຝາກ ຟີນ້າ ຈໍາກັດ, ບັນດາຜູ້ບໍລິຫານ, ຄູ່ຮ່ວມທຸລະກິດ ເຂົ້າຮ່ວມເປັນສັກຂີພະຍານພິທີລົງນາມການຊື້ຂາຍຜະລິດຕະພັນບັດນ້ຳມັນ Pluscard ໃນຄັ້ງນີ້.\r\n\r\nທ່ານ ນາງ ຈັນທະດອມ ເມກສະຫວັນ ໄດ້ຂຶ້ນກ່າວໄວ້ວ່າ ບໍລິສັດ ປີໂຕຣລ້ຽມເທຣດດິ້ງ ລາວ ມະຫາຊົນໄດ້ເຕີບໃຫຍ່ຄຽງຄູ່ກັບການຂະຫຍາຍຕົວຂອງເສດຖະກິດ ແລະ ສັງຄົມລາວຕະຫຼອດໄລຍະເວລາຫຼາຍສິບປີທີ່ຜ່ານມາ. ນອກຈາກຜະລິດຕະພັນນໍ້າມັນ ແລະ ບັນດາປໍ້ານໍ້າມັນ ພວກເຮົາໄດ້ເລີ້ມຕົ້ນສ້າງຜະລິດຕະພັນບັດນໍ້າມັນພລັສກາດ ນັບແຕ່ປີ 2013 ເປັນຕົ້ນມາເຊິ່ງຖືເປັນຜະລິດຕະພັນທີ່ມີນະວັດຕະກໍາທັນສະໄໝໂດຍນໍາໃຊ້ບັດເຕີມນໍ້າມັນແທນເງິນສົດກັບປໍ້ານໍ້າມັນພລັສເກືອບ 50 ປໍ້າທົ່ວປະເທດລາວ ໃນຮູບແບບບັດເຕີມເງິນ ແລະ ບັດແບບໃຫ້ວົງເງິນສິນເຊື່ອ.\r\n\r\nສະຖາບັນການເງິນຈຸລະພາກທີ່ຮັບເງິນຝາກ ຟີນ້າ ຈໍາກັດ ສະໜອງການບໍລິການທາງດ້ານການເງິນທີ່ທັນສະໄໝ ດັ່ງນັ້ນ ບໍລິສັດ ປີໂຕຣລ້ຽມເທຣດດິ້ງ ລາວ ມະຫາຊົນ ຈຶ່ງມີຄວາມໄວ້ວາງໃຈ ແລະ ເຊື່ອໝັ້ນວ່າ ຟີນ້າ ຈະສືບຕໍ່ພັດທະນານະວັດຕະກໍາຂອງບັດນໍ້າມັນ ພລັສກາດ ສູ່ສັງຄົມໄດ້ເປັນຢ່າງດີ.\r\n\r\nຟີນ້າ, ແມ່ນໄດ້ມີການລົງທຶນທາງດ້ານເຕັກໂນໂລຊີສູງໂດຍສະເພາະພື້ນຖານໂຄງລ່າງໃຫ້ມີລະດັບເທົ່າການເງິນສາກົນ ເຊັ່ນ: ມີການໄດ້ເລີ້ມນໍາໃຊ້ລະບົບ Core Banking ໃນການບໍລິຫານຈັດການທຸກຜະລິດຕະພັນທາງການເງິນເຊິ່ງທຽບເທົ່າມາດຕະຖານຂອງທະນາຄານທຸລະກິດຊັ້ນນຳເຖິງແມ່ນວ່າຟີນ້າ ຫາກໍ່ສ້າງຕັ້ງໄດ້ ພຽງ 6 ເດືອນເທົ່ານັ້ນ ແຕ່ພວກເຮົາກໍ່ມີຄວາມພ້ອມຮອບດ້ານທີ່ຈະຮັບພາລະກິດສືບຕໍ່ໃຫ້ບໍລິການຜະລິດຕະພັນບັດນໍ້າມັນພລັສກາດ ແກ່ບັນດາລູກຄ້າໃນຂອບເຂດທົ່ວປະເທດ ດ້ວຍການບໍລິການຊໍາລະທີ່ຈະເຮັດໃຫ້ທຸລະກິດຂອງທ່ານມີຄວາມສະດວກວ່ອງໄວໂປ່ງໃສ ແລະ ມີປະສິດທິພາບຍິ່ງຂຶ້ນ	\N	/file/news/1761360915944-850300995.jpeg	news	2025-10-25 09:55:15.974581
18	FINA ແລະ ສະມາຄົມແມ່ຍິງພິການ ໄດ້ເຊັນບັນທຶກຄວາມເຂົ້າໃຈເພື່ອຮ່ວມມືກັນ	ໃນວັນທີ 11 ຕຸລາ 2024 ທີ່ຜ່ານມາ, FINA ແລະ ສະມາຄົມແມ່ຍິງພິການ ໄດ້ເຊັນບັນທຶກຄວາມເຂົ້າໃຈເພື່ອຮ່ວມມືກັນໃນດ້ານການເປັນໜຶ່ງໃນຕົວແທນທີ່ສໍາຄັນຂອງຟີນ້າເພື່ອມຸ່ງໜ້າມອບບໍລິການທາງການເງິນທີ່ສະດວກສະບາຍແກ່ປະຊາຊົນລາວທີ່ຕ້ອງການຄວາມຊ່ວຍເຫຼືອໃນດ້ານການເງິນ.\r\n.\r\nແນ່ນອນວ່ານີ້ເປັນພຽງຈຸດເລີ່ມຕົ້ນໃນພາລະກິດຂອງພວກເຮົາ, FINA ຈະພັດທະນາບໍລິການຂອງພວກເຮົາໃນທຸກມື້ເພື່ອໃຫ້ປະຊາຊົນລາວທົ່ວປະເທດສາມາດເຂົ້າເຖິງການເງິນໄດ້.	\N	/file/news/1761360188033-520898067.jpeg	news	2025-10-25 09:43:08.04266
23	ພາບບັນຍາກາດ ພິທີລົງນາມ	ພາບບັນຍາກາດ ພິທີລົງນາມ ການຊື້ຂາຍຜະລິດຕະພັນບັດນ້ຳມັນ Pluscard ລະຫວ່າງ ບໍລິສັດ ປີໂຕຣລ້ຽມເທຣດດິ້ງ ລາວ ມະຫາຊົນ (PTL) ແລະ ສະຖາບັນການເງິນຈຸລະພາກທີ່ຮັບເງິນຝາກ ຟີນ້າ ຈໍາກັດ (Fina) ໃນວັນທີ 12 ພຶດສະພາ 2025 ທີ່ຜ່ານມາ.	\N	/file/news/1761363619901-291084129.jpeg	event	2025-10-25 10:40:19.944939
24	ເທດສະການ ຄຳລາວ	ບັນຍາກາດງານ ເທດສະການ ຄຳລາວ 2025! ✨\r\nຮ່ວມຫຼີ້ນກິດຈະກຳກັບ ຟີນ້າ ເພື່ອຮັບຂອງແຈກຂອງແຖມສຸດພິເສດ.\r\n\r\nພົບກັນທີ່ ຫໍປະຊຸມແຫ່ງຊາດຊາດລາວ ວັນທີ 5-7 ກັນຍາ 2025 ນີ້	\N	/file/news/1761364022148-189399578.jpeg	event	2025-10-25 10:47:02.179329
25	InternationalChildren’sDay	🎉ພາບບັນຍາກາດ ກິດຈະກຳວັນເດັກ FINA🎉\r\n\r\nFINA ໄດ້ຈັດ ກິດຈະກຳ ເນື່ອງໃນໂອກາດ ວັນເດັກນ້ອຍສາກົນ ໃຫ້ກັບລູກຫຼານພະນັກງານ ໃນນັ້ນ, ກິດຈະກຳປະກອບມີ ການແຕ້ມຮູບ,ການແຈກເຂົ້າຫນົມ ແລະ ຂອງຂວັນທີ່ຫຼາກຫຼາຍ ເພື່ອເສີມສ້າງພັດທະນາການ ເດັກນ້ອຍທີ່ເຂົ້າຮ່ວມ.\r\n\r\n#FINA #FintechForAll #InternationalChildren’sDay	\N	/file/news/1761364459470-229494602.jpeg	event	2025-10-25 10:54:19.48361
26	Insurance Week!	Insurance Week!\r\nPhongsavanh Insurance APA ລົງຢ້ຽມຢາມ ຫ້ອງການສະຖາບັນການເງິນ ຟີນ້າ\r\nໃນວັນທີ 8 ກໍລະກົດ 2025 ນີ້ ເພື່ອເຜີຍແຜ່ຂໍ້ມູນປະກັນໄພ ແລະ ການບໍລິການ ໃຫ້ແກ່ບັນດາພະນັກງານ\r\n	\N	/file/news/1761364493968-682878690.jpeg	event	2025-10-25 10:54:54.016664
28	Insurance Week!	Insurance Week!\r\nຈຳປາ ປະກັນໄພ ລົງຢ້ຽມຢາມ ຫ້ອງການສະຖາບັນການເງິນ ຟີນ້າ ໃນວັນທີ 10 ກໍລະກົດ 2025 ນີ້ ເພື່ອເຜີຍແຜ່ຂໍ້ມູນປະກັນໄພ ແລະ ປຶກສາຫາລືຄວາມເປັນໄປໄດ້ໃນການຮ່ວມມືໃນອານາຄົດ	\N	/file/news/1761364562530-138414590.jpeg	event	2025-10-25 10:56:02.543808
27	Insurance Week!	Insurance Week!\r\nພຣູເດັນໂຊລ໌ ລາວ ລົງຢ້ຽມຢາມ ຫ້ອງການສະຖາບັນການເງິນ ຟີນ້າ ແລະ  ໄດ້ຈັດງານດື່ມກາເຟຂື້ນ ໃນວັນທີ 9 ກໍລະກົດ 2025 ນີ້ ເພື່ອເຜີຍແຜ່ຂໍ້ມູນປະກັນໄພ ແລະ ການບໍລິການ ໃຫ້ແກ່ບັນດາພະນັກງານ	\N	/file/news/1761364529929-194778043.jpeg	event	2025-10-25 10:55:29.948619
29	ເຕະບານມິດຕະພາບ ສາມັກຄີ	📸ກິດຈະກຳເຕະບານມິດຕະພາບ ສາມັກຄີ ລະຫວ່າງ ສະຖາບັນການເງິນຈຸລະພາກທີ່ຮັບເງິນຝາກ ຟີນ້າ ຈຳກັດ  ແລະ ກົມຄຸ້ມຄອງສະຖາບັນການເງິນທີ່ບໍ່ແມ່ນທະນາຄານ (ກຄສບ) ໃນ ວັນສຸກ ທີ່ຜ່ານມາ.\r\n\r\n⚽🏆 ການສ້າງກິດຈະກຳເຕະບານໃນຄັ້ງນີ້ ແມ່ນເພື່ອຄວາມສາມັກຄີມິດຕະພາບລະຫວ່າງທັງສອງຝ່າຍເພື່ອພົບປະແລກປ່ຽນ ການສ້າງຄວາມສຳພັນທີ່ແໜ້ນແຟ້ນໃນການເຮັດວຽກຮ່ວມກັນ ຫຼາຍຂື້ນ.	\N	/file/news/1761364646437-941576110.jpeg	event	2025-10-25 10:57:26.472857
30	ພະແນກການຄ້າ ຂອງ ຟີນ້າ ໄດ້ລົງຢ້ຽມຢາມ ທ່ານ ໄທຍະພອນ ສິງທອງ, ປະທານ ສະພາການຄ້າ ແລະ ອຸດສາຫະກຳ ແຂວງຄຳມ່ວນ	ໃນອາທິດທີ່ຜ່ານມາ ພະແນກການຄ້າ ຂອງ ຟີນ້າ ໄດ້ລົງຢ້ຽມຢາມ ທ່ານ ໄທຍະພອນ ສິງທອງ, ປະທານ ສະພາການຄ້າ ແລະ ອຸດສາຫະກຳ ແຂວງຄຳມ່ວນ\r\nເພື່ອປຶກສາຫາລືຄວາມເປັນໄປໄດ້ໃນການຮ່ວມມືໃນອານາຄົດ ໃນການສະຫນອງສິນເຊື່ອແກ່ຫົວຫນ່ວຍທຸລະກິດ ຫຼື SME ຂອງແຂວງຄຳມ່ວນ, ພ້ອມທັງໄດ້ແນະນຳຜະລິດຕະພັນທີ່ແທດເຫມາະແກ່ພະນັກງານລັດທະກອນປະຈຳແຂວງ.	\N	/file/news/1761364702361-17881851.jpeg	event	2025-10-25 10:58:22.377435
\.


--
-- TOC entry 3552 (class 0 OID 16409)
-- Dependencies: 220
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.positions (position_id, dept_id, position_title, is_open) FROM stdin;
2	3	ContenCreater	t
3	2	IT support	t
5	2	Developer	t
4	2	Web developer	t
6	4	Sale	t
\.


--
-- TOC entry 3568 (class 0 OID 16526)
-- Dependencies: 236
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promotions (id, title, description, start_date, end_date, image_url, status, created_at) FROM stdin;
13	ໃຫ້ເງິນເຮັດວຽກແທນເຮົາ	ຢ່າປ່ອຍໃຫ້ເງິນນອນຫຼັບ! 😴 ມາປ່ຽນ ເງິນນອນ ໃຫ້ເປັນ ເງິນງອກງາມ ດ້ວຍການຝາກປະຈຳກັບ FINA! ຮັບດອກເບ້ຍສູງເຖິງ 12% ຕໍ່ປີ ທີ່ເຮັດໃຫ້ເງິນຂອງທ່ານເຕີບໂຕຢ່າງໝັ້ນຄົງ. ເລີ່ມຕົ້ນສ້າງຄວາມຮັ່ງມີມື້ນີ້! 💸	\N	\N	/file/promotion/1761361555184-417723599.jpeg	active	2025-10-25 10:05:55.216801
11	Salary loan	ເງິນບໍ່ພໍໃຊ້ ໃນຍາມສຸກເສີນ, ໃຫ້ ຟີນ້າ ດູແລໄດ້!  💰 ກູ້ໄດ້ສູງສຸດ 5 ເທົ່າຂອງເງິນເດືອນ 💸 ຫຼື ບໍ່ເກີນ 50 ລ້ານກີບ 🎉 ບໍ່ຕ້ອງມີຫລັກຊັບຄ້ຳປະກັນ 📉 ດອກເບ້ຍພຽງແຕ່ 1.5% 📆 ກູ້ໄດ້ສູງສຸດເຖິງ 12 ເດືອນ  *ເງື່ອນໄຂ ແລະ ດອກເບ້ຍ  ເປັນໄປຕາມນະໂຍບາຍ ຂອງສະຖາບັນການເງິນຈຸລະພາກທີ່ຮັບເງິນຝາກຟີນ້າຈຳກັດ	\N	\N	/file/promotion/1761361168486-57980340.jpeg	active	2025-10-25 09:19:46.117464
14	ຝາກປະຫຍັດດອກເບ້ຍສູງ ຝາກປະຫຍັດດອກເບ້ຍສູງ ຝາກປະຫຍັດດອກເບ້ຍສູງ ຝາກປະຫຍັດດອກເບ້ຍສູງ	ຢາກໄດ້ ດອກເບ້ຍສູງ ຂຶ້ນບໍ? 💰 ມາຝາກປະຢັດກັບ FINA ຮັບດອກເບ້ຍສູງເຖິງ 4%! ພຽງແຕ່ເລີ່ມຕົ້ນຝາກພຽງ 500,000 ກີບ ກໍສາມາດໃຫ້ເງິນຂອງທ່ານເຕີບໂຕຂຶ້ນໄດ້. ພ້ອມລົງທຶນໃຫ້ເງິນມູນມັງເພີ່ມຂຶ້ນແລ້ວບໍ?	\N	\N	/file/promotion/1761361621704-82981268.jpeg	active	2025-10-25 10:07:01.757969
12	ຜົນຕອບແທນສູງເຖິງ 12% ຕໍ່ປີ	ຈະປະເງິນໄວ້ໃນຕູ້ເກັບເງິນ ຫຼື ຈະຝາກໃຫ້ງອກງາມ?  ເລືອກທາງເລືອກທີ່ຄຸ້ມຄ່າກວ່າ!  FINA ຂໍສະເໜີເງິນຝາກປະຈຳທີ່ໃຫ້ຜົນຕອບແທນສູງເຖິງ 12% ຕໍ່ປີ.  ພ້ອມທີ່ຈະເລີ່ມຕົ້ນສ້າງຄວາມຮັ່ງມີແລ້ວບໍ? 💸	\N	\N	/file/promotion/1761361113814-625042363.jpeg	active	2025-10-25 09:58:33.838434
10	Saving 12%	🎉 ໂປຣ ເງິນຝາກປະຈຳ ຟີນ້າ ທີ່ໃຫ້ດອກເບ້ຍສູງງງງງງ ຮັບດອກເບ້ຍ 12% ຕໍ່ປີ	2025-10-22	\N	/file/promotion/1761358735643-120052405.jpeg	active	2025-10-25 09:00:31.32506
15	ດອກເບ້ຍ Turbo ຮັບດອກເບ້ຍ 14%	ເງິນໃນບັນຊີຂອງທ່ານຈະເຕີບໂຕ ດ້ວຍການຝາກອອມ!  ຝາກຂັ້ນຕ່ຳ 1ລ້ານ ກີບ ກໍ່ສາມາດຮັບດອກເບ້ຍ Turbo ໄດ້! ✅ ເປີດບັນຊີຝາກປະຈຳສະກຸນເງິນກີບ 1 ປີ ຮັບດອກເບ້ຍ 14%	\N	\N	/file/promotion/1761529215178-798712189.jpeg	expired	2025-10-27 08:40:15.207829
\.


--
-- TOC entry 3564 (class 0 OID 16505)
-- Dependencies: 232
-- Data for Name: sliders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sliders (id, image_url, title, description, created_at) FROM stdin;
10	/file/slider/1761531527278-575968650.png	ບັນຊີຝາກປະຢັດ	ດອກເບ້ຍ 4% ຕໍ່ປີ	2025-10-25 10:15:55.802978
9	/file/slider/1761531540480-282906523.png	ບັນຊີເງິນກູ້	ດອກເບ້ຍ 1.5% ຕໍ່ເດືອນ	2025-10-25 09:56:00.670684
8	/file/slider/1761531548124-105103345.png	ເງິນຝາກປະຈຳ	ດອກເບ້ຍ 12% ຕໍ່ປີ	2025-10-25 09:38:50.063826
\.


--
-- TOC entry 3588 (class 0 OID 0)
-- Dependencies: 215
-- Name: admins_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_admin_id_seq', 14, true);


--
-- TOC entry 3589 (class 0 OID 0)
-- Dependencies: 225
-- Name: applicant_details_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.applicant_details_detail_id_seq', 15, true);


--
-- TOC entry 3590 (class 0 OID 0)
-- Dependencies: 221
-- Name: applicants_applicant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.applicants_applicant_id_seq', 34, true);


--
-- TOC entry 3591 (class 0 OID 0)
-- Dependencies: 217
-- Name: departments_dept_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_dept_id_seq', 12, true);


--
-- TOC entry 3592 (class 0 OID 0)
-- Dependencies: 223
-- Name: educations_edu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.educations_edu_id_seq', 16, true);


--
-- TOC entry 3593 (class 0 OID 0)
-- Dependencies: 237
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faqs_id_seq', 10, true);


--
-- TOC entry 3594 (class 0 OID 0)
-- Dependencies: 229
-- Name: imagepopup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imagepopup_id_seq', 11, true);


--
-- TOC entry 3595 (class 0 OID 0)
-- Dependencies: 227
-- Name: job_posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.job_posts_post_id_seq', 7, true);


--
-- TOC entry 3596 (class 0 OID 0)
-- Dependencies: 233
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 30, true);


--
-- TOC entry 3597 (class 0 OID 0)
-- Dependencies: 219
-- Name: positions_position_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.positions_position_id_seq', 6, true);


--
-- TOC entry 3598 (class 0 OID 0)
-- Dependencies: 235
-- Name: promotions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.promotions_id_seq', 15, true);


--
-- TOC entry 3599 (class 0 OID 0)
-- Dependencies: 231
-- Name: sliders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sliders_id_seq', 15, true);


--
-- TOC entry 3369 (class 2606 OID 16396)
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (admin_id);


--
-- TOC entry 3371 (class 2606 OID 16398)
-- Name: admins admins_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);


--
-- TOC entry 3383 (class 2606 OID 16461)
-- Name: applicant_details applicant_details_applicant_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicant_details
    ADD CONSTRAINT applicant_details_applicant_id_key UNIQUE (applicant_id);


--
-- TOC entry 3385 (class 2606 OID 16459)
-- Name: applicant_details applicant_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicant_details
    ADD CONSTRAINT applicant_details_pkey PRIMARY KEY (detail_id);


--
-- TOC entry 3379 (class 2606 OID 16431)
-- Name: applicants applicants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_pkey PRIMARY KEY (applicant_id);


--
-- TOC entry 3373 (class 2606 OID 16407)
-- Name: departments departments_dept_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_dept_name_key UNIQUE (dept_name);


--
-- TOC entry 3375 (class 2606 OID 16405)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (dept_id);


--
-- TOC entry 3381 (class 2606 OID 16445)
-- Name: educations educations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educations
    ADD CONSTRAINT educations_pkey PRIMARY KEY (edu_id);


--
-- TOC entry 3397 (class 2606 OID 16544)
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- TOC entry 3389 (class 2606 OID 16503)
-- Name: imagepopup imagepopup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagepopup
    ADD CONSTRAINT imagepopup_pkey PRIMARY KEY (id);


--
-- TOC entry 3387 (class 2606 OID 16482)
-- Name: job_posts job_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_posts
    ADD CONSTRAINT job_posts_pkey PRIMARY KEY (post_id);


--
-- TOC entry 3393 (class 2606 OID 16524)
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- TOC entry 3377 (class 2606 OID 16415)
-- Name: positions positions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (position_id);


--
-- TOC entry 3395 (class 2606 OID 16535)
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (id);


--
-- TOC entry 3391 (class 2606 OID 16513)
-- Name: sliders sliders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sliders
    ADD CONSTRAINT sliders_pkey PRIMARY KEY (id);


--
-- TOC entry 3402 (class 2606 OID 16462)
-- Name: applicant_details applicant_details_applicant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicant_details
    ADD CONSTRAINT applicant_details_applicant_id_fkey FOREIGN KEY (applicant_id) REFERENCES public.applicants(applicant_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3400 (class 2606 OID 16434)
-- Name: applicants applicants_applied_position_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_applied_position_id_fkey FOREIGN KEY (applied_position_id) REFERENCES public.positions(position_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3401 (class 2606 OID 16446)
-- Name: educations educations_applicant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educations
    ADD CONSTRAINT educations_applicant_id_fkey FOREIGN KEY (applicant_id) REFERENCES public.applicants(applicant_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3398 (class 2606 OID 16491)
-- Name: admins fk_admin_dept; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT fk_admin_dept FOREIGN KEY (dept_id) REFERENCES public.departments(dept_id) ON DELETE SET NULL;


--
-- TOC entry 3403 (class 2606 OID 16483)
-- Name: job_posts job_posts_position_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_posts
    ADD CONSTRAINT job_posts_position_id_fkey FOREIGN KEY (position_id) REFERENCES public.positions(position_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3399 (class 2606 OID 16416)
-- Name: positions positions_dept_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_dept_id_fkey FOREIGN KEY (dept_id) REFERENCES public.departments(dept_id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2025-11-10 09:17:54 +07

--
-- PostgreSQL database dump complete
--

\unrestrict XS8FuGeDbGwpjDcjPrr1uNuy51Bt6r8peGvAqMcUHvEsQPrqhHTYT0rvt1oNrCy

