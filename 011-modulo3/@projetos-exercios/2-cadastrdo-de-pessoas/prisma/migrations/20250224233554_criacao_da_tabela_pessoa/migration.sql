-- CreateTable
CREATE TABLE "pessoas" (
    "id" TEXT NOT NULL,
    "idade" DECIMAL(65,30) NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "peso" DECIMAL(65,30) NOT NULL,
    "genero" TEXT NOT NULL,
    "nacionalidade" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_cpf_key" ON "pessoas"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_email_key" ON "pessoas"("email");
