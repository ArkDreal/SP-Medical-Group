USE SP_Medical_Group
GO

--ESPECIALIDADE
SELECT * FROM Especialidade

--TIPOS DE USUARIOS
SELECT * FROM TipoUsuario

--USUARIOS 
SELECT * FROM Usuario

--SITUAÇÃO
SELECT * FROM Situacao

--CLINICAS
SELECT * FROM Clinica

--PACIENTES
SELECT * FROM Paciente

--MÉDICOS
SELECT * FROM Medico

--CONSULTAS
SELECT * FROM Consulta

--CONTAGEM DE USUÁRIOS
SELECT COUNT(idUsuario) [Numero De Usuarios] FROM Usuario;
GO

--FUNÇÕES
CREATE FUNCTION EspecialidadeF(@NomeEspecialidade VARCHAR(100))
RETURNS TABLE
AS
RETURN
(
 SELECT @NomeEspecialidade AS EspecialidadeF, COUNT(idEspecialidade) [Numero De Médicos] FROM Especialidade
 WHERE NomeEspecialidade LIKE '%'+ @NomeEspecialidade +'%'
)
GO

SELECT * FROM EspecialidadeF('Psiquiatria');
GO

--IDADE DOS PACIENTES
CREATE PROCEDURE IDADE
@nome VARCHAR(100)
AS
BEGIN
 SELECT P.NomePaciente, DATEDIFF(YEAR, P.DataNascimento, GETDATE()) AS Idade  FROM Paciente P
 INNER JOIN Usuario U
 ON P.idUsuario = U.idUsuario
 WHERE P.NomePaciente = @nome
END
GO

exec IDADE 'Mariana'
