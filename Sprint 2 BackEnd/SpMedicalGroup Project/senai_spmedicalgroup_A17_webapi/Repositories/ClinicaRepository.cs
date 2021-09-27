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
    public class ClinicaRepository : IClinicaRepository
    {
        SpMedicalGroupContext ctx = new SpMedicalGroupContext();

        public void Atualizar(int id, Clinica attClinica)
        {
            Clinica clinicaBuscada = BuscarClinica(id);
            if (attClinica.Endereço != null || attClinica.Cnpj != null || attClinica.NomeClinica!= null || attClinica.RazaoSocial != null)
            {
                clinicaBuscada.Endereço = attClinica.Endereço;
                clinicaBuscada.Cnpj = attClinica.Cnpj;
                clinicaBuscada.NomeClinica = attClinica.NomeClinica;
                clinicaBuscada.RazaoSocial = attClinica.RazaoSocial;

                ctx.Clinicas.Update(clinicaBuscada);

                ctx.SaveChanges();
            }
        }

        public Clinica BuscarClinica(int id)
        {
            return ctx.Clinicas.FirstOrDefault(c => c.IdClinica == id);
        }

        public void CadastrarClinica(Clinica novaClinica)
        {
            ctx.Clinicas.Add(novaClinica);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Clinicas.Remove(BuscarClinica(id));

            ctx.SaveChanges();
        }

        public List<Clinica> ListarTodas()
        {
            return ctx.Clinicas
                    .AsNoTracking()
                    .Include(c => c.Medicos)
                    .ToList();
        }
    }
}
