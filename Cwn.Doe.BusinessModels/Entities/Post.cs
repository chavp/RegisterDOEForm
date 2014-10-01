using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cwn.Doe.BusinessModels.Entities
{
    public class Post
    {
        public virtual long Seq { get; protected set; }
        public virtual string PostCode { get; set; }

        public virtual string TambolCode { get; set; }
        public virtual string AmphurCode { get; set; }
        public virtual string ProvinceCode { get; set; }
    }
}
