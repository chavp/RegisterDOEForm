using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class Occupation
    {
        public virtual long Seq { get; protected set; }
        public virtual string OccupationName { get; set; }
    }
}
