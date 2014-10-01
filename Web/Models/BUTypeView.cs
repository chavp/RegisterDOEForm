using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DoeWeb.Models
{
    public class BUTypeView
    {
        public long Seq { get; set; }

        public string BUTypeCode { get; set; }
        public string BUTypeName { get; set; }
        public string BUCategoryCode { get; set; }
    }
}