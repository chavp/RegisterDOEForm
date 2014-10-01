using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class BUType
        : EntityVersion
    {
        public virtual long Seq { get; protected set; }

        public virtual string BUTypeCode { get; set; }
        public virtual string BUTypeName { get; set; }
        public virtual string GroupFlag { get; set; }

        public virtual string BUCategoryCode { get; set; }
        public virtual string ActiveFlag { get; set; }
    }
}
