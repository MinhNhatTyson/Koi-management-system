using System;
using System.Collections.Generic;
using BusinessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BusinessLayer;

public partial class KoiCareContext : DbContext
{
    public KoiCareContext()
    {
    }

    public KoiCareContext(DbContextOptions<KoiCareContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BlogPost> BlogPosts { get; set; }

    public virtual DbSet<FeedSchedule> FeedSchedules { get; set; }

    public virtual DbSet<KoiFish> KoiFishes { get; set; }

    public virtual DbSet<KoiGrowth> KoiGrowths { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Pond> Ponds { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SaltCalculation> SaltCalculations { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WaterParameter> WaterParameters { get; set; }

    private string? GetConnectionString()
    {
        IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true).Build();
        return configuration["ConnectionStrings:DBDefault"];
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("PK__BlogPost__AA126038DD459419");

            entity.Property(e => e.PostId).HasColumnName("PostID");
            entity.Property(e => e.AuthorId).HasColumnName("AuthorID");
            entity.Property(e => e.PostedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Title).HasMaxLength(100);

            entity.HasOne(d => d.Author).WithMany(p => p.BlogPosts)
                .HasForeignKey(d => d.AuthorId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__BlogPosts__Autho__4316F928");
        });

        modelBuilder.Entity<FeedSchedule>(entity =>
        {
            entity.HasKey(e => e.FeedId).HasName("PK__FeedSche__1586DF758EB7047C");

            entity.ToTable("FeedSchedule");

            entity.Property(e => e.FeedId).HasColumnName("FeedID");
            entity.Property(e => e.FeedAmount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.FeedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.KoiId).HasColumnName("KoiID");
            entity.Property(e => e.Notes).HasMaxLength(255);

            entity.HasOne(d => d.Koi).WithMany(p => p.FeedSchedules)
                .HasForeignKey(d => d.KoiId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__FeedSched__KoiID__440B1D61");
        });

        modelBuilder.Entity<KoiFish>(entity =>
        {
            entity.HasKey(e => e.KoiId).HasName("PK__KoiFish__E03435B8A5EDBECE");

            entity.ToTable("KoiFish");

            entity.Property(e => e.KoiId).HasColumnName("KoiID");
            entity.Property(e => e.Breed).HasMaxLength(100);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.Image).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Origin).HasMaxLength(100);
            entity.Property(e => e.PondId).HasColumnName("PondID");
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Size).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Weight).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Pond).WithMany(p => p.KoiFishes)
                .HasForeignKey(d => d.PondId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__KoiFish__PondID__44FF419A");
        });

        modelBuilder.Entity<KoiGrowth>(entity =>
        {
            entity.HasKey(e => e.GrowthId).HasName("PK__KoiGrowt__7F859E9F1A47E262");

            entity.ToTable("KoiGrowth");

            entity.Property(e => e.GrowthId).HasColumnName("GrowthID");
            entity.Property(e => e.KoiId).HasColumnName("KoiID");
            entity.Property(e => e.Notes).HasMaxLength(255);
            entity.Property(e => e.Size).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Weight).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Koi).WithMany(p => p.KoiGrowths)
                .HasForeignKey(d => d.KoiId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__KoiGrowth__KoiID__45F365D3");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAFD8D1C475");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.OrderDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Orders__UserID__48CFD27E");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.OrderItemId).HasName("PK__OrderIte__57ED06A17709C93B");

            entity.Property(e => e.OrderItemId).HasColumnName("OrderItemID");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__OrderItem__Order__46E78A0C");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__OrderItem__Produ__47DBAE45");
        });

        modelBuilder.Entity<Pond>(entity =>
        {
            entity.HasKey(e => e.PondId).HasName("PK__Ponds__D18BF854F99121DF");

            entity.Property(e => e.PondId).HasColumnName("PondID");
            entity.Property(e => e.Depth).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.PondName).HasMaxLength(100);
            entity.Property(e => e.PumpCapacity).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Size).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Volume).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.WaterDischargeRate).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.User).WithMany(p => p.Ponds)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Ponds__UserID__49C3F6B7");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Products__B40CC6ED13FAF9CB");

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.ProductDescription).HasMaxLength(255);
            entity.Property(e => e.ProductName).HasMaxLength(100);
        });

        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasKey(e => e.ReportId).HasName("PK__Reports__D5BD48E5CC0DF622");

            entity.Property(e => e.ReportId).HasColumnName("ReportID");
            entity.Property(e => e.GeneratedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ReportName).HasMaxLength(100);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE3AF71C2FD7");

            entity.HasIndex(e => e.RoleName, "UQ__Roles__8A2B6160CFD00A38").IsUnique();

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.RoleName).HasMaxLength(20);
        });

        modelBuilder.Entity<SaltCalculation>(entity =>
        {
            entity.HasKey(e => e.SaltId).HasName("PK__SaltCalc__036055F3BF2AE3F1");

            entity.ToTable("SaltCalculation");

            entity.Property(e => e.SaltId).HasColumnName("SaltID");
            entity.Property(e => e.CalculationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Notes).HasMaxLength(255);
            entity.Property(e => e.PondId).HasColumnName("PondID");
            entity.Property(e => e.SaltAmount).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Pond).WithMany(p => p.SaltCalculations)
                .HasForeignKey(d => d.PondId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__SaltCalcu__PondI__4AB81AF0");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCACE68DB6F1");

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.Username).HasMaxLength(50);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Users__RoleID__4BAC3F29");
        });

        modelBuilder.Entity<WaterParameter>(entity =>
        {
            entity.HasKey(e => e.ParameterId).HasName("PK__WaterPar__F80C629743CCB319");

            entity.Property(e => e.ParameterId).HasColumnName("ParameterID");
            entity.Property(e => e.MeasurementDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.No2)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("NO2");
            entity.Property(e => e.No3)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("NO3");
            entity.Property(e => e.Oxygen).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.PH)
                .HasColumnType("decimal(4, 2)")
                .HasColumnName("pH");
            entity.Property(e => e.Po4)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("PO4");
            entity.Property(e => e.PondId).HasColumnName("PondID");
            entity.Property(e => e.Salinity).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Temperature).HasColumnType("decimal(5, 2)");

            entity.HasOne(d => d.Pond).WithMany(p => p.WaterParameters)
                .HasForeignKey(d => d.PondId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__WaterPara__PondI__4CA06362");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
