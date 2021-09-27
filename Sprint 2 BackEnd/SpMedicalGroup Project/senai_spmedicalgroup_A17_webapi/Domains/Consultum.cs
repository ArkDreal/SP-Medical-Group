using System;
using System.Collections.Generic;

#nullable disable

namespace senai_spmedicalgroup_A17_webapi.Domains
{
    public partial class Consultum
    {
        public byte IdConsulta { get; set; }
        public short? IdPaciente { get; set; }
        public byte? IdMedico { get; set; }
        public byte? IdSituacao { get; set; }
        public DateTime DataConsulta { get; set; }
        public string Descricao { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Paciente IdPacienteNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
    }
}
