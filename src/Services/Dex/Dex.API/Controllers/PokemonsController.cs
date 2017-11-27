using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dex.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Pokemons")]
    public class PokemonsController : Controller
    {
        [HttpGet]
        public string GetPokemons()
        {
            return "GetPokemons";
        }

        [HttpGet("{id}")]
        public string GetPokemonByID(string id)
        {
            return "GetPokemonByID" + id;
        }
    }
}