using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class BUCategory
        : EntityVersion
    {
        public virtual long Seq { get; protected set; }

        public virtual string BUCategoryCode { get; set; }
        public virtual string BUCategoryName { get; set; }
        public virtual int BUOrder { get; set; }
    }
}
