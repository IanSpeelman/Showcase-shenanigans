using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Showcase_Shenanigans_api.Migrations
{
    /// <inheritdoc />
    public partial class CapitalizeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "MovieEvents",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "MovieEvents",
                newName: "id");
        }
    }
}
