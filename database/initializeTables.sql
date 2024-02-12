--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.0

-- Started on 2024-02-11 15:05:33 PST

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
-- TOC entry 218 (class 1259 OID 16395)
-- Name: Tutors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public."Tutors" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Tutors" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16394)
-- Name: Tutors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tutors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tutors_id_seq" OWNER TO postgres;

--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 217
-- Name: Tutors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tutors_id_seq" OWNED BY public."Tutors".id;


--
-- TOC entry 3210 (class 2604 OID 16398)
-- Name: Tutors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tutors" ALTER COLUMN id SET DEFAULT nextval('public."Tutors_id_seq"'::regclass);


--
-- TOC entry 3357 (class 0 OID 16395)
-- Dependencies: 218
-- Data for Name: Tutors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Tutors" (id, name, email, "createdAt", "updatedAt") VALUES (1, 'Mit', 'mitramesh.jain@sjsu.edu', '2024-02-11 22:59:11.93+00', '2024-02-11 22:59:11.93+00');
INSERT INTO public."Tutors" (id, name, email, "createdAt", "updatedAt") VALUES (2, 'Sarvagya', 'sarvagya.bhargava@sjsu.edu', '2024-02-11 23:00:50.682+00', '2024-02-11 23:00:50.682+00');
INSERT INTO public."Tutors" (id, name, email, "createdAt", "updatedAt") VALUES (3, 'Sirisha', 'sirisha.krishnamurthy@sjsu.edu', '2024-02-11 23:01:16.099+00', '2024-02-11 23:01:16.099+00');
INSERT INTO public."Tutors" (id, name, email, "createdAt", "updatedAt") VALUES (4, 'Lohith', 'lohithraj.surenagaraja@sjsu.edu', '2024-02-11 23:01:39.548+00', '2024-02-11 23:01:39.548+00');
INSERT INTO public."Tutors" (id, name, email, "createdAt", "updatedAt") VALUES (5, 'Mayuri', 'mayuripraveen.shimpi@sjsu.edu', '2024-02-11 23:02:00.245+00', '2024-02-11 23:02:00.245+00');


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 217
-- Name: Tutors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tutors_id_seq"', 5, true);


--
-- TOC entry 3212 (class 2606 OID 16402)
-- Name: Tutors Tutors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tutors"
    ADD CONSTRAINT "Tutors_pkey" PRIMARY KEY (id);



CREATE TABLE IF NOT EXISTS public."Slots" (
    id integer NOT NULL,
    day character varying(255) NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    tutor1_id integer NOT NULL,
    tutor1 boolean DEFAULT false,
    tutor2_id integer NOT NULL,
    tutor2 boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Slots" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16389)
-- Name: Slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Slots_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Slots_id_seq" OWNER TO postgres;

--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 215
-- Name: Slots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Slots_id_seq" OWNED BY public."Slots".id;


--
-- TOC entry 3202 (class 2604 OID 16393)
-- Name: Slots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Slots" ALTER COLUMN id SET DEFAULT nextval('public."Slots_id_seq"'::regclass);


--
-- TOC entry 3351 (class 0 OID 16390)
-- Dependencies: 216
-- Data for Name: Slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (2, 'M', '12:00:00', '12:15:00', 4, false, 1, false, '2024-02-05 05:53:36.615+00', '2024-02-05 05:53:36.615+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (5, 'M', '12:15:00', '12:30:00', 4, false, 1, false, '2024-02-05 05:58:22.769+00', '2024-02-05 05:58:22.769+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (8, 'M', '12:30:00', '12:45:00', 4, false, 1, false, '2024-02-05 05:59:27.504+00', '2024-02-05 05:59:27.504+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (11, 'M', '12:45:00', '13:00:00', 4, false, 1, false, '2024-02-05 06:00:40.475+00', '2024-02-05 06:00:40.475+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (14, 'M', '13:00:00', '13:15:00', 4, false, 1, false, '2024-02-05 06:01:14.51+00', '2024-02-05 06:01:14.51+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (17, 'M', '13:15:00', '13:30:00', 4, false, 1, false, '2024-02-05 06:01:42.277+00', '2024-02-05 06:01:42.277+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (20, 'M', '13:30:00', '13:45:00', 4, false, 1, false, '2024-02-05 06:02:10.275+00', '2024-02-05 06:02:10.275+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (23, 'M', '13:45:00', '14:00:00', 4, false, 1, false, '2024-02-05 06:02:51.662+00', '2024-02-05 06:02:51.662+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (26, 'M', '14:00:00', '14:15:00', 4, false, 3, false, '2024-02-05 06:03:10.227+00', '2024-02-05 06:03:10.227+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (29, 'M', '14:15:00', '14:30:00', 4, false, 3, false, '2024-02-05 06:03:26.511+00', '2024-02-05 06:03:26.511+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (32, 'M', '14:30:00', '14:45:00', 4, false, 3, false, '2024-02-05 06:03:46.858+00', '2024-02-05 06:03:46.858+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (35, 'M', '14:45:00', '15:00:00', 4, false, 3, false, '2024-02-05 06:04:05.924+00', '2024-02-05 06:04:05.924+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (39, 'M', '15:00:00', '15:15:00', 4, false, 3, false, '2024-02-05 06:04:25.769+00', '2024-02-05 06:04:25.769+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (41, 'M', '15:15:00', '15:30:00', 4, false, 3, false, '2024-02-05 06:04:41.321+00', '2024-02-05 06:04:41.321+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (44, 'M', '15:30:00', '15:45:00', 4, false, 3, false, '2024-02-05 06:04:58.896+00', '2024-02-05 06:04:58.896+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (47, 'M', '15:45:00', '16:00:00', 4, false, 3, false, '2024-02-05 06:05:23.045+00', '2024-02-05 06:05:23.045+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (50, 'M', '16:00:00', '16:15:00', 4, false, 3, false, '2024-02-05 06:05:47.462+00', '2024-02-05 06:05:47.462+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (53, 'M', '16:15:00', '16:30:00', 4, false, 3, false, '2024-02-05 06:06:01.529+00', '2024-02-05 06:06:01.529+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (56, 'M', '16:30:00', '16:45:00', 4, false, 3, false, '2024-02-05 06:06:32.461+00', '2024-02-05 06:06:32.461+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (59, 'M', '16:45:00', '17:00:00', 4, false, 3, false, '2024-02-05 06:06:49.46+00', '2024-02-05 06:06:49.46+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (3, 'T', '12:00:00', '12:15:00', 4, false, 1, false, '2024-02-05 05:56:25.012+00', '2024-02-05 05:56:25.012+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (6, 'T', '12:15:00', '12:30:00', 4, false, 1, false, '2024-02-05 05:58:27.76+00', '2024-02-05 05:58:27.76+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (9, 'T', '12:30:00', '12:45:00', 4, false, 1, false, '2024-02-05 05:59:30.29+00', '2024-02-05 05:59:30.29+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (12, 'T', '12:45:00', '13:00:00', 4, false, 1, false, '2024-02-05 06:00:43.258+00', '2024-02-05 06:00:43.258+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (15, 'T', '13:00:00', '13:15:00', 2, false, 1, false, '2024-02-05 06:01:17.778+00', '2024-02-05 06:01:17.778+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (18, 'T', '13:15:00', '13:30:00', 2, false, 1, false, '2024-02-05 06:01:44.841+00', '2024-02-05 06:01:44.841+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (21, 'T', '13:30:00', '13:45:00', 2, false, 1, false, '2024-02-05 06:02:12.772+00', '2024-02-05 06:02:12.772+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (24, 'T', '13:45:00', '14:00:00', 2, false, 1, false, '2024-02-05 06:02:55.523+00', '2024-02-05 06:02:55.523+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (27, 'T', '14:00:00', '14:15:00', 2, false, 1, false, '2024-02-05 06:03:12.709+00', '2024-02-05 06:03:12.709+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (30, 'T', '14:15:00', '14:30:00', 2, false, 1, false, '2024-02-05 06:03:32.441+00', '2024-02-05 06:03:32.441+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (33, 'T', '14:30:00', '14:45:00', 2, false, 1, false, '2024-02-05 06:03:50.176+00', '2024-02-05 06:03:50.176+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (36, 'T', '14:45:00', '15:00:00', 2, false, 1, false, '2024-02-05 06:04:08.572+00', '2024-02-05 06:04:08.572+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (40, 'T', '15:00:00', '15:15:00', 2, false, 5, false, '2024-02-05 06:04:29.248+00', '2024-02-05 06:04:29.248+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (42, 'T', '15:15:00', '15:30:00', 2, false, 5, false, '2024-02-05 06:04:43.582+00', '2024-02-05 06:04:43.582+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (45, 'T', '15:30:00', '15:45:00', 2, false, 5, false, '2024-02-05 06:05:01.165+00', '2024-02-05 06:05:01.165+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (48, 'T', '15:45:00', '16:00:00', 2, false, 5, false, '2024-02-05 06:05:26.277+00', '2024-02-05 06:05:26.277+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (51, 'T', '16:00:00', '16:15:00', 2, false, 5, false, '2024-02-05 06:05:50.127+00', '2024-02-05 06:05:50.127+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (54, 'T', '16:15:00', '16:30:00', 2, false, 5, false, '2024-02-05 06:06:03.826+00', '2024-02-05 06:06:03.826+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (57, 'T', '16:30:00', '16:45:00', 2, false, 5, false, '2024-02-05 06:06:35.257+00', '2024-02-05 06:06:35.257+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (60, 'T', '16:45:00', '15:00:00', 2, false, 5, false, '2024-02-05 06:06:51.742+00', '2024-02-05 06:06:51.742+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (4, 'Th', '12:00:00', '12:15:00', 1, false, 3, false, '2024-02-05 05:57:16.544+00', '2024-02-05 06:59:19.939+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (7, 'Th', '12:15:00', '12:30:00', 1, false, 3, false, '2024-02-05 05:58:31.344+00', '2024-02-05 05:58:31.344+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (10, 'Th', '12:30:00', '12:45:00', 1, false, 3, false, '2024-02-05 06:00:27.649+00', '2024-02-05 06:00:27.649+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (13, 'Th', '12:45:00', '13:00:00', 1, false, 3, false, '2024-02-05 06:00:47.244+00', '2024-02-05 06:00:47.244+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (16, 'Th', '13:00:00', '13:15:00', 5, false, 3, false, '2024-02-05 06:01:31.693+00', '2024-02-05 06:01:31.693+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (19, 'Th', '13:15:00', '13:30:00', 5, false, 3, false, '2024-02-05 06:01:47.057+00', '2024-02-05 06:01:47.057+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (22, 'Th', '13:30:00', '13:45:00', 5, false, 3, false, '2024-02-05 06:02:15.773+00', '2024-02-05 06:02:15.773+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (25, 'Th', '13:45:00', '14:00:00', 5, false, 3, false, '2024-02-05 06:02:58.224+00', '2024-02-05 06:02:58.224+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (28, 'Th', '14:00:00', '14:15:00', 5, false, 3, false, '2024-02-05 06:03:15.009+00', '2024-02-05 06:03:15.009+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (31, 'Th', '14:15:00', '14:30:00', 5, false, 3, false, '2024-02-05 06:03:34.524+00', '2024-02-05 06:03:34.524+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (34, 'Th', '14:30:00', '14:45:00', 5, false, 3, false, '2024-02-05 06:03:55.757+00', '2024-02-05 06:03:55.757+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (37, 'Th', '14:45:00', '15:00:00', 5, false, 3, false, '2024-02-05 06:04:12.743+00', '2024-02-05 06:04:12.743+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (38, 'Th', '15:00:00', '15:15:00', 5, false, 2, false, '2024-02-05 06:04:22.572+00', '2024-02-05 06:04:22.572+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (43, 'Th', '15:15:00', '15:30:00', 5, false, 2, false, '2024-02-05 06:04:46.451+00', '2024-02-05 06:04:46.451+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (46, 'Th', '15:30:00', '15:45:00', 5, false, 2, false, '2024-02-05 06:05:03.278+00', '2024-02-05 06:05:03.278+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (49, 'Th', '15:45:00', '16:00:00', 5, false, 2, false, '2024-02-05 06:05:28.445+00', '2024-02-05 06:05:28.445+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (52, 'Th', '16:00:00', '16:15:00', 5, false, 2, false, '2024-02-05 06:05:53.06+00', '2024-02-05 06:05:53.06+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (55, 'Th', '16:15:00', '16:30:00', 5, false, 2, false, '2024-02-05 06:06:05.842+00', '2024-02-05 06:06:05.842+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (58, 'Th', '16:30:00', '16:45:00', 5, false, 2, false, '2024-02-05 06:06:38.344+00', '2024-02-05 06:06:38.344+00');
INSERT INTO public."Slots" (id, day, start_time, end_time, tutor1_id, tutor1, tutor2_id, tutor2, "createdAt", "updatedAt") VALUES (61, 'Th', '16:45:00', '15:00:00', 5, false, 2, false, '2024-02-05 06:06:53.757+00', '2024-02-05 06:06:53.757+00');


--
-- TOC entry 3358 (class 0 OID 0)
-- Dependencies: 215
-- Name: Slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Slots_id_seq"', 61, true);


--
-- TOC entry 3206 (class 2606 OID 16397)
-- Name: Slots Slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Slots"
    ADD CONSTRAINT "Slots_pkey" PRIMARY KEY (id);



