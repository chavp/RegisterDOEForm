using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class Country
    {
        public virtual long Seq { get; protected set; }
        public virtual string CountryTH { get; set; }
        public virtual string CountryEN { get; set; }
        public virtual string CountryAbv { get; set; }
    }
}
