using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Dex.API.Model;
namespace Dex.API.Infrastructure.Contexts
{
    public class DexContext : DbContext
    {
        DbSet<Pokemon> Pokemons;

        
    }
}
