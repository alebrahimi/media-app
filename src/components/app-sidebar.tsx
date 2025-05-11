'use client';

import * as React from 'react';
import Link from 'next/link';

import { NavMenu } from '@/components/nav-menu';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar collapsible="icon" {...props}>
         <SidebarHeader className="flex items-center justify-center">
            <Link href="/">
               <p>Media App</p>
            </Link>
         </SidebarHeader>
         <SidebarContent>
            <NavMenu />
         </SidebarContent>
         <SidebarFooter>
            <NavUser />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   );
}
