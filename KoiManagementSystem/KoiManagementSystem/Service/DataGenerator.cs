using Bogus;
using Bogus.DataSets;
using BusinessLayer;
using BusinessLayer.Entities;

namespace KoiManagementSystem.Service
{
    public class DataGenerator
    {
        private readonly Faker _faker = new Faker();
        private readonly KoiCareContext _koiCareContext;
        public DataGenerator(KoiCareContext koiCareContext)
        {
            _koiCareContext = koiCareContext;
        }

        public User GenerateUser()
        {
            return new User
            {
                Username = _faker.Internet.UserName(),
                PasswordHash = _faker.Internet.Password(),
                Email = _faker.Internet.Email(),
                RoleId = _faker.Random.Int(1,4)
            };
        }

        public Pond GeneratePond()
        {
            List<int> existedUserId = _koiCareContext.Users.Select(u => u.UserId).ToList();
            return new Pond
            {
                PondName = _faker.Company.CompanyName(),
                Size = _faker.Random.Decimal(10, 100),
                Depth = _faker.Random.Decimal(1, 10),
                Volume = _faker.Random.Decimal(100, 1000),
                WaterDischargeRate = _faker.Random.Decimal(1, 10),
                PumpCapacity = _faker.Random.Decimal(10, 100),
                UserId = _faker.PickRandom(existedUserId)
            };
        }

        public WaterParameter GenerateWaterParams()
        {
            List<int> existedPondId = _koiCareContext.Ponds.Select(u => u.PondId).ToList();
            return new WaterParameter
            {
                MeasurementDate = _faker.Date.Between(DateTime.Now.AddDays(-30), DateTime.Now),
                Temperature = _faker.Random.Decimal(10, 100),
                Salinity = _faker.Random.Decimal(1, 10),
                PH = _faker.Random.Decimal(1, 10),
                Oxygen = _faker.Random.Decimal(1, 10),
                No2 = _faker.Random.Decimal(1, 10),
                No3 = _faker.Random.Decimal(1, 10),
                Po4 = _faker.Random.Decimal(1,10),
                PondId = _faker.PickRandom(existedPondId)
            };
        }

        public SaltCalculation GenerateSaltCalculation()
        {
            List<int> existedPondId = _koiCareContext.Ponds.Select(u => u.PondId).ToList();
            return new SaltCalculation
            {
                CalculationDate = _faker.Date.Between(DateTime.Now.AddDays(-30), DateTime.Now),
                Notes = _faker.Lorem.Text(),
                SaltAmount = _faker.Random.Decimal(10, 100),
                PondId = _faker.PickRandom(existedPondId)
            };
        }

        public KoiFish GenerateKoiFish()
        {
            List<int> existedPondId = _koiCareContext.Ponds.Select(u => u.PondId).ToList();
            return new KoiFish
            {
                Name = _faker.Lorem.Word(),
                Image = _faker.Internet.Url(),
                Age = _faker.Random.Int(1, 10),
                Size = _faker.Random.Decimal(5, 20),
                Weight = _faker.Random.Decimal(0.5m, 5m),
                Gender = _faker.PickRandom("Male", "Female"),
                Breed = _faker.Lorem.Word(),
                Origin = _faker.Address.Country(),
                Price = _faker.Random.Decimal(10, 100),
                PondId = _faker.PickRandom(existedPondId)
            };
        }

        public FeedSchedule GenerateFeedSchedule()
        {
            List<int> existedKoiId = _koiCareContext.KoiFishes.Select(u => u.KoiId).ToList();
            return new FeedSchedule
            {
                FeedDate = _faker.Date.Between(DateTime.Now.AddDays(-30), DateTime.Now),
                FeedAmount = _faker.Random.Decimal(0.1m, 10m),
                Notes = _faker.Lorem.Word()
            };
        }

        public KoiGrowth GenerateKoiGrowth()
        {
            List<int> existedKoiId = _koiCareContext.KoiFishes.Select(u => u.KoiId).ToList();
            return new KoiGrowth
            {
                GrowthDate = DateOnly.Parse(_faker.Date.Between(DateTime.Now.AddDays(-30), DateTime.Now).ToString("yyyy-MM-dd")),
                Size = _faker.Random.Decimal(5m, 20m),
                Weight = _faker.Random.Decimal(0.5m, 5m),
                Notes = _faker.Lorem.Word()
            };
        }

        public void PopulateDatabase(KoiCareContext context)
        {
            // Delete existing data
            context.Users.RemoveRange(context.Users);

            // Generate new sample data
            var users = Enumerable.Range(1, 10).Select(_ => GenerateUser()).ToList();
            context.Users.AddRange(users);

            context.Ponds.RemoveRange(context.Ponds);
            context.KoiFishes.RemoveRange(context.KoiFishes);
            context.FeedSchedules.RemoveRange(context.FeedSchedules);
            context.KoiGrowths.RemoveRange(context.KoiGrowths);

            context.SaveChanges();

           

            var ponds = Enumerable.Range(1, 5).Select(_ => GeneratePond()).ToList();
            context.Ponds.AddRange(ponds);
            context.SaveChanges();


                var koiFishes = Enumerable.Range(1, 5).Select(_ => GenerateKoiFish()).ToList();
                context.KoiFishes.AddRange(koiFishes);

            context.SaveChanges();

                var waterParams = Enumerable.Range(1, 5).Select(_ => GenerateWaterParams()).ToList();
                context.WaterParameters.AddRange(waterParams);

                var saltCalculations = Enumerable.Range(1, 5).Select(_ => GenerateSaltCalculation()).ToList();
                context.SaltCalculations.AddRange(saltCalculations);

                var feedSchedules = Enumerable.Range(1, 5).Select(_ => GenerateFeedSchedule()).ToList();
                context.FeedSchedules.AddRange(feedSchedules);

                var koiGrowths = Enumerable.Range(1, 5).Select(_ => GenerateKoiGrowth()).ToList();
                context.KoiGrowths.AddRange(koiGrowths);

            context.SaveChanges();
        }
    }
}
