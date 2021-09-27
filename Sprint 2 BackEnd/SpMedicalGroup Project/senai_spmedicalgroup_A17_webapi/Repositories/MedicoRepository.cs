using senai_spmedicalgroup_A17_webapi.Context;
using senai_spmedicalgroup_A17_webapi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_spmedicalgroup_A17_webapi.Repositories
{
    public class MedicoRepository
    {
        SpMedicalGroupContext ctx = new SpMedicalGroupContext();
        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.ToList();
        }
    }
}
