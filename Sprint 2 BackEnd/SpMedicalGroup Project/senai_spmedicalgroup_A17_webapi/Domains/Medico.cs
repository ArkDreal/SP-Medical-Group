using System;
using System.Collections.Generic;

#nullable disable

namespace senai_spmedicalgroup_A17_webapi.Domains
{
    public partial class Medico
    {
        public Medico()
        {
            Consulta = new HashSet<Consultum>();
        }

        public byte IdMedico { get; set; }
        public short? IdUsuario { get; set; }
        public short? IdClinica { get; set; }
        public short? IdEspecialidade { get; set; }
        public string NomeMedico { get; set; }
        public string Crm { get; set; }

        public virtual Clinica IdClinicaNavigation { get; set; }
        public virtual Especialidade IdEspecialidadeNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
