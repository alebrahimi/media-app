'use client';

import Link from 'next/link';
import { History } from 'lucide-react';

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function NavMenu() {
   return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
         {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
         <SidebarMenu>
            <Link href="/posts">
               <SidebarMenuItem>
                  <SidebarMenuButton className="text-sidebar-foreground/70">
                     <History className="text-sidebar-foreground/70" />
                     <span>Posts</span>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </Link>
         </SidebarMenu>
      </SidebarGroup>
   );
}
