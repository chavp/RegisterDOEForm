using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class WPType
    {
        public virtual long Seq { get; protected set; }

        public virtual string Type { get; set; }
        public virtual string TypeName { get; set; }
        public virtual string TypeReason { get; set; }
        public virtual string ActiveFlag { get; set; }
    }
}
