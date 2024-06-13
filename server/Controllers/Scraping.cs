using System;
using System.IO;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace server.Controllers
{
    [Route("/scrapping")]
    [ApiController]
    public class ExcelController : Controller
    {
        [HttpGet("download")]
        public IActionResult BaixarEAbrirExcel()
        {
            DateTime date = DateTime.Now;
            string url = "https://www.stf.jus.br/arquivo/cms/informativoSTF/anexo/Informativo_Dados/Dados_InformativosSTF.xlsx"; // Substitua pelo link real
            string nomeArquivo = $"arquivo_baixado_{date:yyyyMMdd_HHmmss}.xlsx";
            string pastaDownloads = Path.Combine("C:\\Users\\Frederico Garcêz", "Downloads");
            string caminhoSalvamento = Path.Combine(pastaDownloads, nomeArquivo);
            try
            {
                // 1. Baixar o arquivo
                using (WebClient client = new WebClient())
                {
                    client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3");

                    client.DownloadFile(url, caminhoSalvamento);
                }

                return Ok("Arquivo Excel baixado e aberto com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }
    }
}
