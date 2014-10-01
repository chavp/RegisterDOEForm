using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class Visatype
    {
        public virtual long Seq { get; protected set; }

        public virtual string Typevisa { get; set; }
        public virtual string TypevisaTH { get; set; }
        public virtual string TypevisaAbv { get; set; }
    }
}
