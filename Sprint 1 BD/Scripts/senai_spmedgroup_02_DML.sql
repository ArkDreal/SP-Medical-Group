USE SP_Medical_Group
GO

--ESPECIALIDADE
INSERT INTO Especialidade(NomeEspecialidade)
VALUES ('Acupuntura'),
       ('Anestesiologia'),
       ('Angiologia'),
       ('Cardiologia'),
       ('Cirurgia Cardiovascular'),
       ('Cirurgia de Mão'),
       ('Cirurgia do Aparelho Digestivo'),
	   ('Cirurgia Geral'),
       ('Cirurgia Pediátrica'),
       ('Cirurgia Plástica'),
       ('Cirurgia Torácica'),
       ('Cirurgia Vascular'),
       ('Dermatologia'),
       ('Radioterapia'),
       ('Urologia'),
       ('Pediatria'), 
       ('Psiquiatria');
GO

--TIPOS DE USUARIOS
INSERT INTO TipoUsuario(TituloTipoUsuario)
VALUES ('Administrador'),
       ('Medico'),
	   ('Paciente');
GO

--USUARIOS 
INSERT INTO Usuario(IdTipoUsuario,Email,Senha)
VALUES (2,'ricardo.lemos@spmedicalgroup.com.br',	'ricardo123'),
       (2,	'roberto.possarle@spmedicalgroup.com.br',	'possarle456'),
       (2,	'helena.souza@spmedicalgroup.com.br',	'helena789'),
       (3,	'ligia@gmail.com',	'ligia123'),
       (3, 'alexandre@gmail.com',	'alexandre456'),
       (3,	'fernando@gmail.com',	'fernando789'),
       (3,	'henrique@gmail.com',	'henrique987'),
       (3,	'joao@gmail.com',	'joao654'),
       (3,	'bruno@gmail.com','bruno123'),
       (3,	'mariana@outlook.com',	'mariana987'),
       (1,	'adm@adm.com',	'adm123');
GO

--SITUAÇÃO
INSERT INTO Situacao(Situacao)
VALUES ('Agendada'),
       ('Realizada'),
	   ('Cancelada');
GO

--CLINICAS
INSERT INTO Clinica(NomeClinica,Endereço,CNPJ,RazaoSocial,HorarioAbertura,HorarioFechamento)
VALUES ('Clinica Possarle','Av. Barão Limeira, 532','86.400.902/0001-30','SP Medical Group','07:00:00','22:00:00');
GO

--PACIENTES
INSERT INTO Paciente(IdUsuario,NomePaciente,RG,CPF,Endereço,DataNascimento,Telefone)
VALUES (4,'Ligia','43522543-5','94839859000','Rua Estado de Israel 240, São Paulo, São Paulo - SP, 04022-000','03/10/83','11 3456-7654'),
       (5,'Alexandre','32654345-7','73556944057','Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200','03/07/01','11 98765-6543'),
       (6,'Fernando','54636525-3','16839338002','Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200','10/10/78','11 97208-4453'),
       (7,'Henrique','54366362-5','14332654765','R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030','13/10/85','11 3456-6543'),
       (8,'João','532544444-1','91305348010','R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380','27/08/75','11 7656-6377'),
       (9,'Bruno','54566266-7','79799299004','Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001','21/03/72','11 95436-8769'),
       (10,'Mariana','54566266-8','13771913039','R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140','05/03/18',NULL)
GO

--MÉDICOS
INSERT INTO Medico(IdUsuario,IdClinica,IdEspecialidade,NomeMedico,CRM)
VALUES (1,1,2,'Ricardo Lemos','54356SP'),
       (2,1,16,'Roberto Possarle','53452SP'),
       (3,1,17,'Helena Strada','65463SP');
GO

--CONSULTAS
INSERT INTO Consulta(IdPaciente,IdMedico,IdSituacao,DataConsulta,Descricao)
VALUES (7,3,1,'14/09/21','Criança com catarro na garganta'),
       (2,2,2,'28/08/21','Paciente com falta de confiança em si mesmo'),
       (3,2,1,'29/08/21','Paciente com depressão severa'),
       (2,2,1,'04/09/21','Paciente com boderline'),
       (4,1,2,'23/08/21','Paciente verificando se tem alergia a anestesia utilizada na cirurgia'),
       (7,3,3,'30/08/21','Criança com dor de bronquilote'),
       (4,1,3,'04/09/21','Paciente com parestesia');
GO

