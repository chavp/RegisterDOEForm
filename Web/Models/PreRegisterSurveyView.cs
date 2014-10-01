using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DoeWeb.Models
{
    public class PreRegisterSurveyView
    {
        public long Seq { get; set; }
        public long WPPreRegisterSeq { get; set; }
        public string UnitsCode { get; set; }
        public string NameContract { get; set; }
        public string Tel { get; set; }
    }
}