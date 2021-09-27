using senai_spmedicalgroup_A17_webapi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_spmedicalgroup_A17_webapi.Interfaces
{
    /// <summary>
    /// Interface responsável pelo PresencaRepository
    /// </summary>
    interface IConsultaRepository
    {
        List<Consultum> ListarTodas();


        List<Consultum> ListarConsultaPaciente(int id);


        List<Consultum> ListarConsultaMedico(int id);


        void CadastrarConsulta(Consultum novaConsulta);


        void CancelarConsulta(int Id);


        void RemoverConsultaSistema(int id);


        void AlterarDescricao(string descricao, int id);


        Consultum BuscarPorId(int id);

    }
}
