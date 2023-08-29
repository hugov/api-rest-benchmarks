CREATE TABLE public.banks (
    id SERIAL NOT NULL,
    code VARCHAR(3) NOT NULL,
    description VARCHAR(100) NOT NULL,
    status INT NOT NULL,
    CONSTRAINT pk_banks PRIMARY KEY ("id")
);

CREATE TABLE public.users (
  id SERIAL NOT NULL,
  name VARCHAR(100) NULL,
  username VARCHAR(20) NULL,
  password VARCHAR(100) NULL,
  document_type INT,
  document VARCHAR(14) NULL,
  dob DATE NULL,
  email VARCHAR(100) NULL,
  phone_number VARCHAR(15) NULL,
  mother_name VARCHAR(45) NULL,
  zip_code VARCHAR(8) NULL,
  street VARCHAR(45) NULL,
  number VARCHAR(45) NULL,
  complement VARCHAR(45) NULL,
  city VARCHAR(45) NULL,
  state VARCHAR(45) NULL,
  bank VARCHAR(45) NULL,
  branch VARCHAR(45) NULL,
  account VARCHAR(45) NULL,
  pix_type INT NULL,
  pix_key VARCHAR(35) NULL,
  create_time TIMESTAMP(6) NULL DEFAULT NOW(),
  status INT NULL,
  CONSTRAINT pk_users PRIMARY KEY ("id")
);