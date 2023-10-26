--
-- PostgreSQL database dump
--

-- Dumped from database version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)

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

--
-- Name: tiger; Type: SCHEMA; Schema: -; Owner: xabigonz
--

CREATE SCHEMA tiger;


ALTER SCHEMA tiger OWNER TO xabigonz;

--
-- Name: tiger_data; Type: SCHEMA; Schema: -; Owner: xabigonz
--

CREATE SCHEMA tiger_data;


ALTER SCHEMA tiger_data OWNER TO xabigonz;

--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: xabigonz
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO xabigonz;

--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: xabigonz
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: postgis_raster; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_raster WITH SCHEMA public;


--
-- Name: EXTENSION postgis_raster; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_raster IS 'PostGIS raster types and functions';


--
-- Name: postgis_tiger_geocoder; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder WITH SCHEMA tiger;


--
-- Name: EXTENSION postgis_tiger_geocoder; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_tiger_geocoder IS 'PostGIS tiger geocoder and reverse geocoder';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: rand(); Type: FUNCTION; Schema: public; Owner: xabigonz
--

CREATE FUNCTION public.rand() RETURNS double precision
    LANGUAGE sql
    AS $$SELECT random();$$;


ALTER FUNCTION public.rand() OWNER TO xabigonz;

--
-- Name: substring_index(text, text, integer); Type: FUNCTION; Schema: public; Owner: xabigonz
--

CREATE FUNCTION public.substring_index(text, text, integer) RETURNS text
    LANGUAGE sql
    AS $_$SELECT array_to_string((string_to_array($1, $2)) [1:$3], $2);$_$;


ALTER FUNCTION public.substring_index(text, text, integer) OWNER TO xabigonz;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: competiciones; Type: TABLE; Schema: public; Owner: xabigonz
--

CREATE TABLE public.competiciones (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    fecha date NOT NULL
);


ALTER TABLE public.competiciones OWNER TO xabigonz;

--
-- Name: competiciones_id_seq; Type: SEQUENCE; Schema: public; Owner: xabigonz
--

CREATE SEQUENCE public.competiciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.competiciones_id_seq OWNER TO xabigonz;

--
-- Name: competiciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xabigonz
--

ALTER SEQUENCE public.competiciones_id_seq OWNED BY public.competiciones.id;


--
-- Name: nadadores; Type: TABLE; Schema: public; Owner: xabigonz
--

CREATE TABLE public.nadadores (
    id integer NOT NULL,
    dni character varying(9) NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    genero character varying(6) NOT NULL
);


ALTER TABLE public.nadadores OWNER TO xabigonz;

--
-- Name: nadadores_id_seq; Type: SEQUENCE; Schema: public; Owner: xabigonz
--

CREATE SEQUENCE public.nadadores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nadadores_id_seq OWNER TO xabigonz;

--
-- Name: nadadores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xabigonz
--

ALTER SEQUENCE public.nadadores_id_seq OWNED BY public.nadadores.id;


--
-- Name: pruebas; Type: TABLE; Schema: public; Owner: xabigonz
--

CREATE TABLE public.pruebas (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL
);


ALTER TABLE public.pruebas OWNER TO xabigonz;

--
-- Name: pruebas_id_seq; Type: SEQUENCE; Schema: public; Owner: xabigonz
--

CREATE SEQUENCE public.pruebas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pruebas_id_seq OWNER TO xabigonz;

--
-- Name: pruebas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xabigonz
--

ALTER SEQUENCE public.pruebas_id_seq OWNED BY public.pruebas.id;


--
-- Name: resultados; Type: TABLE; Schema: public; Owner: xabigonz
--

CREATE TABLE public.resultados (
    id integer NOT NULL,
    id_nadador integer NOT NULL,
    id_prueba integer NOT NULL,
    tiempo interval NOT NULL
);


ALTER TABLE public.resultados OWNER TO xabigonz;

--
-- Name: resultados_id_seq; Type: SEQUENCE; Schema: public; Owner: xabigonz
--

CREATE SEQUENCE public.resultados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.resultados_id_seq OWNER TO xabigonz;

--
-- Name: resultados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xabigonz
--

ALTER SEQUENCE public.resultados_id_seq OWNED BY public.resultados.id;


--
-- Name: competiciones id; Type: DEFAULT; Schema: public; Owner: xabigonz
--

ALTER TABLE ONLY public.competiciones ALTER COLUMN id SET DEFAULT nextval('public.competiciones_id_seq'::regclass);


--
-- Name: nadadores id; Type: DEFAULT; Schema: public; Owner: xabigonz
--

ALTER TABLE ONLY public.nadadores ALTER COLUMN id SET DEFAULT nextval('public.nadadores_id_seq'::regclass);


--
-- Name: pruebas id; Type: DEFAULT; Schema: public; Owner: xabigonz
--

ALTER TABLE ONLY public.pruebas ALTER COLUMN id SET DEFAULT nextval('public.pruebas_id_seq'::regclass);


--
-- Name: resultados id; Type: DEFAULT; Schema: public; Owner: xabigonz
--

ALTER TABLE ONLY public.resultados ALTER COLUMN id SET DEFAULT nextval('public.resultados_id_seq'::regclass);


--
-- Data for Name: competiciones; Type: TABLE DATA; Schema: public; Owner: xabigonz
--

COPY public.competiciones (id, nombre, fecha) FROM stdin;
1	Campeonato de España	2023-09-20
2	Copa de España	2023-10-20
3	Torneo Internacional	2023-11-20
\.


--
-- Data for Name: nadadores; Type: TABLE DATA; Schema: public; Owner: xabigonz
--

COPY public.nadadores (id, dni, nombre, apellido, genero) FROM stdin;
1	12356789A	Juan	Pérez	Hombre
2	23456890B	María	López	Mujer
3	34568901C	Pedro	González	Hombre
4	45689012D	Ana	Martínez	Mujer
5	56879834H	Julia	Daniela	Hombre
7	44572628P	IkerSoto	Soto	Hombre
\.


--
-- Data for Name: pruebas; Type: TABLE DATA; Schema: public; Owner: xabigonz
--

COPY public.pruebas (id, nombre) FROM stdin;
1	50 metros libres
2	100 metros libres
3	200 metros libres
4	400 metros libres
\.


--
-- Data for Name: resultados; Type: TABLE DATA; Schema: public; Owner: xabigonz
--

COPY public.resultados (id, id_nadador, id_prueba, tiempo) FROM stdin;
1	1	1	00:25:00
2	2	2	00:50:00
3	3	3	02:25:00
4	4	4	05:00:00
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: xabigonz
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: geocode_settings; Type: TABLE DATA; Schema: tiger; Owner: xabigonz
--

COPY tiger.geocode_settings (name, setting, unit, category, short_desc) FROM stdin;
\.


--
-- Data for Name: pagc_gaz; Type: TABLE DATA; Schema: tiger; Owner: xabigonz
--

COPY tiger.pagc_gaz (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_lex; Type: TABLE DATA; Schema: tiger; Owner: xabigonz
--

COPY tiger.pagc_lex (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_rules; Type: TABLE DATA; Schema: tiger; Owner: xabigonz
--

COPY tiger.pagc_rules (id, rule, is_custom) FROM stdin;
\.


--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: xabigonz
--

COPY topology.topology (id, name, srid, "precision", hasz) FROM stdin;
\.


--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: xabigonz
--

COPY topology.layer (topology_id, layer_id, schema_name, table_name, feature_column, feature_type, level, child_id) FROM stdin;
\.


--
-- Name: competiciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xabigonz
--

SELECT pg_catalog.setval('public.competiciones_id_seq', 3, true);


--
-- Name: nadadores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xabigonz
--

SELECT pg_catalog.setval('public.nadadores_id_seq', 7, true);


--
-- Name: pruebas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xabigonz
--

SELECT pg_catalog.setval('public.pruebas_id_seq', 4, true);


--
-- Name: resultados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xabigonz
--

SELECT pg_catalog.setval('public.resultados_id_seq', 4, true);


--
-- Name: competiciones competiciones_pkey; Type: CONSTRAINT; Schema: public; Owner: xabigonz
--

ALTER TABLE ONLY public.competiciones
    ADD CONSTRAINT competiciones_pkey PRIMARY KEY (id);


--
-- Name: nadadores nadadores_pkey; Type: CONSTRAINT; Schema: public; Owner: xabigonz
--

ALTER TABLE ONLY public.nadadores
    ADD CONSTRAINT nadadores_pkey PRIMARY KEY (id);


--
-- Name: pruebas pruebas_pkey; Type: CONSTRAINT; Schema: public; Owner: xabigonz
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_pkey PRIMARY KEY (id);


--
-- Name: resultados resultados_pkey; Type: CONSTRAINT; Schema: public; Owner: xabigonz
--

ALTER TABLE ONLY public.resultados
    ADD CONSTRAINT resultados_pkey PRIMARY KEY (id);


--
-- Name: resultados resultados_id_nadador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: xabigonz
--

ALTER TABLE ONLY public.resultados
    ADD CONSTRAINT resultados_id_nadador_fkey FOREIGN KEY (id_nadador) REFERENCES public.nadadores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: resultados resultados_id_prueba_fkey; Type: FK CONSTRAINT; Schema: public; Owner: xabigonz
--

ALTER TABLE ONLY public.resultados
    ADD CONSTRAINT resultados_id_prueba_fkey FOREIGN KEY (id_prueba) REFERENCES public.pruebas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: xabigonz
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO xabigonz;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: TABLE geography_columns; Type: ACL; Schema: public; Owner: xabigonz
--

REVOKE ALL ON TABLE public.geography_columns FROM postgres;
REVOKE SELECT ON TABLE public.geography_columns FROM PUBLIC;
GRANT ALL ON TABLE public.geography_columns TO xabigonz;
GRANT SELECT ON TABLE public.geography_columns TO PUBLIC;


--
-- Name: TABLE geometry_columns; Type: ACL; Schema: public; Owner: xabigonz
--

REVOKE ALL ON TABLE public.geometry_columns FROM postgres;
REVOKE SELECT ON TABLE public.geometry_columns FROM PUBLIC;
GRANT ALL ON TABLE public.geometry_columns TO xabigonz;
GRANT SELECT ON TABLE public.geometry_columns TO PUBLIC;


--
-- Name: TABLE raster_columns; Type: ACL; Schema: public; Owner: xabigonz
--

REVOKE ALL ON TABLE public.raster_columns FROM postgres;
REVOKE SELECT ON TABLE public.raster_columns FROM PUBLIC;
GRANT ALL ON TABLE public.raster_columns TO xabigonz;
GRANT SELECT ON TABLE public.raster_columns TO PUBLIC;


--
-- Name: TABLE raster_overviews; Type: ACL; Schema: public; Owner: xabigonz
--

REVOKE ALL ON TABLE public.raster_overviews FROM postgres;
REVOKE SELECT ON TABLE public.raster_overviews FROM PUBLIC;
GRANT ALL ON TABLE public.raster_overviews TO xabigonz;
GRANT SELECT ON TABLE public.raster_overviews TO PUBLIC;


--
-- Name: TABLE spatial_ref_sys; Type: ACL; Schema: public; Owner: xabigonz
--

REVOKE ALL ON TABLE public.spatial_ref_sys FROM postgres;
REVOKE SELECT ON TABLE public.spatial_ref_sys FROM PUBLIC;
GRANT ALL ON TABLE public.spatial_ref_sys TO xabigonz;
GRANT SELECT ON TABLE public.spatial_ref_sys TO PUBLIC;


--
-- Name: TABLE geocode_settings; Type: ACL; Schema: tiger; Owner: xabigonz
--

REVOKE ALL ON TABLE tiger.geocode_settings FROM postgres;
REVOKE SELECT ON TABLE tiger.geocode_settings FROM PUBLIC;
GRANT ALL ON TABLE tiger.geocode_settings TO xabigonz;
GRANT SELECT ON TABLE tiger.geocode_settings TO PUBLIC;


--
-- Name: TABLE geocode_settings_default; Type: ACL; Schema: tiger; Owner: xabigonz
--

REVOKE ALL ON TABLE tiger.geocode_settings_default FROM postgres;
REVOKE SELECT ON TABLE tiger.geocode_settings_default FROM PUBLIC;
GRANT ALL ON TABLE tiger.geocode_settings_default TO xabigonz;
GRANT SELECT ON TABLE tiger.geocode_settings_default TO PUBLIC;


--
-- Name: TABLE loader_lookuptables; Type: ACL; Schema: tiger; Owner: xabigonz
--

REVOKE ALL ON TABLE tiger.loader_lookuptables FROM postgres;
REVOKE SELECT ON TABLE tiger.loader_lookuptables FROM PUBLIC;
GRANT ALL ON TABLE tiger.loader_lookuptables TO xabigonz;
GRANT SELECT ON TABLE tiger.loader_lookuptables TO PUBLIC;


--
-- Name: TABLE loader_platform; Type: ACL; Schema: tiger; Owner: xabigonz
--

REVOKE ALL ON TABLE tiger.loader_platform FROM postgres;
REVOKE SELECT ON TABLE tiger.loader_platform FROM PUBLIC;
GRANT ALL ON TABLE tiger.loader_platform TO xabigonz;
GRANT SELECT ON TABLE tiger.loader_platform TO PUBLIC;


--
-- Name: TABLE loader_variables; Type: ACL; Schema: tiger; Owner: xabigonz
--

REVOKE ALL ON TABLE tiger.loader_variables FROM postgres;
REVOKE SELECT ON TABLE tiger.loader_variables FROM PUBLIC;
GRANT ALL ON TABLE tiger.loader_variables TO xabigonz;
GRANT SELECT ON TABLE tiger.loader_variables TO PUBLIC;


--
-- Name: TABLE pagc_gaz; Type: ACL; Schema: tiger; Owner: xabigonz
--

REVOKE ALL ON TABLE tiger.pagc_gaz FROM postgres;
REVOKE SELECT ON TABLE tiger.pagc_gaz FROM PUBLIC;
GRANT ALL ON TABLE tiger.pagc_gaz TO xabigonz;
GRANT SELECT ON TABLE tiger.pagc_gaz TO PUBLIC;


--
-- Name: TABLE pagc_lex; Type: ACL; Schema: tiger; Owner: xabigonz
--

REVOKE ALL ON TABLE tiger.pagc_lex FROM postgres;
REVOKE SELECT ON TABLE tiger.pagc_lex FROM PUBLIC;
GRANT ALL ON TABLE tiger.pagc_lex TO xabigonz;
GRANT SELECT ON TABLE tiger.pagc_lex TO PUBLIC;


--
-- Name: TABLE pagc_rules; Type: ACL; Schema: tiger; Owner: xabigonz
--

REVOKE ALL ON TABLE tiger.pagc_rules FROM postgres;
REVOKE SELECT ON TABLE tiger.pagc_rules FROM PUBLIC;
GRANT ALL ON TABLE tiger.pagc_rules TO xabigonz;
GRANT SELECT ON TABLE tiger.pagc_rules TO PUBLIC;


--
-- PostgreSQL database dump complete
--

