using BusinessLayer.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace BusinessLayer.Validator
{
    public class KoiGrowthRequestDTOValidator : AbstractValidator<KoiGrowthRequestDTO>
    {
        public KoiGrowthRequestDTOValidator()
        {
            RuleFor(x => x.GrowthDate).NotNull().WithMessage("Growth date is required");
            RuleFor(x => x.Size).GreaterThan(0).WithMessage("Invalid size");
            RuleFor(x => x.Weight).GreaterThan(0).WithMessage("Invalid weight");
        }
    }
}
