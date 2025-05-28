import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <HomeLayout>{children}</HomeLayout>
    </div>
  );
};
export default Layout;
//next js expects the layout to be a default export and the layout to be a function that takes a single prop called children and returns a div with the children inside it
