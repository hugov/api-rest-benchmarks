CREATE TABLE public.banks (
    id SERIAL NOT NULL,
    code VARCHAR(3) NOT NULL,
    description VARCHAR(100) NOT NULL,
    status INT NOT NULL,
    CONSTRAINT pk_banks PRIMARY KEY ("id")
);