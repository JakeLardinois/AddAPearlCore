﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddAPearl.DataAccess
{
    [Table("Item")]
    public partial class Item
    {
        [Key]
        public int ItemId { get; set; }

        public decimal? Price { get; set; }

        public decimal PurchasePrice { get; set; }

        public DateTime? PurchaseDate { get; set; }

        public string Description { get; set; }

        public int OwnerId { get; set; }

        public int CustomerId { get; set; }
    }
}
