using senai_spmedicalgroup_A17_webapi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_spmedicalgroup_A17_webapi.Interfaces
{
    interface IClinicaRepository
    {
        void CadastrarClinica(Clinica novaClinica);


        void Atualizar(int id, Clinica attClinica);


        List<Clinica> ListarTodas();


        void Deletar(int id);


        Clinica BuscarClinica(int id);

    }
}
