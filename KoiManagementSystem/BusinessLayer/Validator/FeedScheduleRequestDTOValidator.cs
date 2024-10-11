using BusinessLayer.Request;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class FeedScheduleRequestDTOValidator : AbstractValidator<FeedScheduleRequestDTO>
{
    public FeedScheduleRequestDTOValidator()
    {
        RuleFor(x => x.FeedDate).NotNull().WithMessage("Feed date is required");
        RuleFor(x => x.Notes).NotNull().WithMessage("Notes is required");
        RuleFor(x => x.FeedAmount).GreaterThan(0).WithMessage("Invalid feed amount");
    }
}
