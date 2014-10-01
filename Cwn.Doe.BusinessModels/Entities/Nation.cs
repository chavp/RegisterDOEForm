using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class Nation
    {
        public virtual long Seq { get; protected set; }
        public virtual string NationTH { get; set; }
        public virtual string NationEN { get; set; }
        public virtual string NationCode { get; set; }
    }
}
