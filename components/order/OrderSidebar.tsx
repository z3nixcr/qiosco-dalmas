import prisma from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  return (
    <aside className="fmd:w-72 md:h-screen bg-white">
      <Logo />
      <div className="p-2">
        <nav className="mt-10 bg-amber-100 rounded-md p-4">
          {categories.map((category) => (
            <CategoryIcon
              key={category.id}
              category={category}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
