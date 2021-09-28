using Microsoft.EntityFrameworkCore;
using senai_spmedicalgroup_A17_webapi.Context;
using senai_spmedicalgroup_A17_webapi.Domains;
using senai_spmedicalgroup_A17_webapi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_spmedicalgroup_A17_webapi.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        SpMedicalGroupContext ctx = new SpMedicalGroupContext();
        public void Atualizar(int id, Paciente attPaciente)
        {
            Paciente pacienteBuscado = BuscarPorId(id);

            if (attPaciente.Cpf != null || attPaciente.Rg != null || attPaciente.Telefone != null || attPaciente.Endereço != null || attPaciente.DataNascimento < DateTime.Now)
            {
                pacienteBuscado.Rg = attPaciente.Rg;
                pacienteBuscado.IdUsuario = attPaciente.IdUsuario;
                pacienteBuscado.Cpf = attPaciente.Cpf;
                pacienteBuscado.Telefone = attPaciente.Telefone;
                pacienteBuscado.Endereço = attPaciente.Endereço;
                pacienteBuscado.DataNascimento = attPaciente.DataNascimento;

                ctx.Pacientes.Update(pacienteBuscado);

                ctx.SaveChanges();
            }
        }

        public Paciente BuscarPorId(int id)
        {
            return ctx.Pacientes.FirstOrDefault(p => p.IdPaciente == id);
        }

        public void Cadastrar(Paciente novoPaciente)
        {
            ctx.Pacientes.Add(novoPaciente);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Pacientes.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

        public List<Paciente> ListarTodos()
        {
            return ctx.Pacientes
                        .AsNoTracking()
                        .Include(p => p.IdUsuarioNavigation)
                        .ToList();

        }
    }
}
