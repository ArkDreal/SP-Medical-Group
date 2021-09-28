using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai_spmedicalgroup_A17_webapi.Domains;
using senai_spmedicalgroup_A17_webapi.Interfaces;
using senai_spmedicalgroup_A17_webapi.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace senai_spmedicalgroup_A17_webapi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository _clinicaRepository { get; set; }

        public ClinicasController()
        {
            _clinicaRepository = new ClinicaRepository();
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Cadastrar(Clinica novaClinica)
        {
            try
            {

                if (novaClinica == null)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Os valores inseridos são inválidos!"
                    });
                }
                _clinicaRepository.CadastrarClinica(novaClinica);

                return StatusCode(201, new
                {
                    Mensagem = "A instituição foi cadastrada com sucesso",
                    novaClinica
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                List<Clinica> lista = _clinicaRepository.ListarTodas();

                if (lista == null)
                {
                    return StatusCode(404, new
                    {
                        Mensagem = "Não há nenhuma instituição cadastrada!"
                    });
                }

                return Ok(new
                {
                    Mensagem = $"Foram encontradas {lista.Count()} clínicas",
                    lista
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "1")]
        [HttpPut("{id:int}")]
        public IActionResult Atualizar(int id, Clinica attClinica)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Insira um id válido"
                    });
                }

                if (_clinicaRepository.BuscarClinica(id) == null)
                {
                    return StatusCode(404, new
                    {
                        Mensagem = "Não há nenhuma clínica com o id informado!"
                    });
                }
                if (attClinica.Cnpj == null || attClinica.Endereço == null || attClinica.NomeClinica == null || attClinica.RazaoSocial == null || attClinica.Cnpj.Length != 14)
                {
                    return BadRequest(new
                    {
                        Mensagem = "As informações inseridas são inválidas!"
                    });
                }

                _clinicaRepository.Atualizar(id, attClinica);
                return Ok(new
                {
                    Mensagem = "A clínica foi atualizada com sucesso!",
                    attClinica
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "1")]
        [HttpDelete("{id:int}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Insira um id válido"
                    });
                }

                if (_clinicaRepository.BuscarClinica(id) == null)
                {
                    return StatusCode(404, new
                    {
                        Mensagem = "Não há nenhuma clínica com o id informado!"
                    });
                }

                _clinicaRepository.Deletar(id);
                return Ok(new
                {
                    Mensagem = "A clínica foi excluída com sucesso!",
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


        }
    }
}
