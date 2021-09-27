using Microsoft.EntityFrameworkCore;
using senai_spmedicalgroup_A17_webapi.Context;
using senai_spmedicalgroup_A17_webapi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_spmedicalgroup_A17_webapi.Repositories
{
    public class ConsultaRepository
    {
        SpMedicalGroupContext ctx = new SpMedicalGroupContext();
        public void AlterarDescricao(string descricao, int id)
        {
            Consultum consultaBuscado = BuscarPorId(id);
            if (descricao != null)
            {
                consultaBuscado.Descricao = descricao;

                ctx.Consulta.Update(consultaBuscado);

                ctx.SaveChanges();
            };

        }

        public void CadastrarConsulta(Consultum novaConsulta)
        {

            novaConsulta.Descricao = "A Consulta foi agendada!";
            novaConsulta.IdSituacao = 2;

            ctx.Consulta.Add(novaConsulta);

            ctx.SaveChanges();

        }

        public Consultum BuscarPorId(int id)
        {
            return ctx.Consulta.FirstOrDefault(u => u.IdConsulta == id);
        }

        public void CancelarConsulta(int Id)
        {
            Consultum consultaBuscada = BuscarPorId(Id);

            consultaBuscada.IdSituacao = 3;
            consultaBuscada.Descricao = "Consulta Cancelada!";

            ctx.Consulta.Update(consultaBuscada);
            ctx.SaveChanges();

        }

        public List<Consultum> ListarConsultaMedico(int id)
        {
            Medico medico = ctx.Medicos.FirstOrDefault(u => u.IdUsuario == id);

            int idMedico = medico.IdMedico;

            return ctx.Consulta
                            .Where(c => c.IdMedico == idMedico)
                            .AsNoTracking()
                            .Include(c => c.IdMedicoNavigation)
                            .Include(c => c.IdPacienteNavigation)
                            .Include(c => c.IdSituacaoNavigation)
                            .ToList();
        }

        public List<Consultum> ListarConsultaPaciente(int id)
        {
            Paciente paciente = ctx.Pacientes.FirstOrDefault(u => u.IdUsuario == id);

            int idPaciente = paciente.IdPaciente;
            return ctx.Consulta
                            .Where(c => c.IdConsulta == idPaciente)
                            .AsNoTracking()
                            .Include(c => c.IdMedicoNavigation)
                            .Include(c => c.IdPacienteNavigation)
                            .Include(c => c.IdSituacaoNavigation)
                            .ToList();


        }

        public List<Consultum> ListarTodas()
        {
            return ctx.Consulta.ToList();
        }

        public void RemoverConsultaSistema(int id)
        {
            ctx.Consulta.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }

    }
}
