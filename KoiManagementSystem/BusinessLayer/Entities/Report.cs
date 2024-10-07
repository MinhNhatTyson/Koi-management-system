using System;
using System.Collections.Generic;

namespace BusinessLayer.Entities;

public partial class Report
{
    public int ReportId { get; set; }

    public string? ReportName { get; set; }

    public DateTime? GeneratedAt { get; set; }

    public string? Data { get; set; }
}
