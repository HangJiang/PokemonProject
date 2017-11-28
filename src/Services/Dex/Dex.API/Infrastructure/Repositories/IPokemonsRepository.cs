using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dex.API.Infrastructure.Repositories
{
    public interface IPokemonsRepository
    {
        List<Object> GetPokemonsList();
        Object GetPokemonInfo(string pmid);
    }
}
