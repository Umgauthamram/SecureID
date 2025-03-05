import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { PanelLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = createContext(null);

export function useSidebar() {
const context = useContext(SidebarContext);
if (!context) {
throw new Error("useSidebar must be used within a SidebarProvider.");
}
return context;
}

export function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange, className, style, children, ...props }) {
const isMobile = useIsMobile();
const [openMobile, setOpenMobile] = useState(false);
const [_open, _setOpen] = useState(defaultOpen);
const open = openProp ?? _open;

const setOpen = useCallback((value) => {
const openState = typeof value === "function" ? value(open) : value;
if (onOpenChange) {
onOpenChange(openState);
} else {
_setOpen(openState);
}
document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
}, [onOpenChange, open]);

const toggleSidebar = useCallback(() => {
return isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev);
}, [isMobile, setOpen, setOpenMobile]);

useEffect(() => {
const handleKeyDown = (event) => {
if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
event.preventDefault();
toggleSidebar();
}
};
window.addEventListener("keydown", handleKeyDown);
return () => window.removeEventListener("keydown", handleKeyDown);
}, [toggleSidebar]);

const state = open ? "expanded" : "collapsed";
const contextValue = useMemo(() => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

return (
<SidebarContext.Provider value={contextValue}>
<TooltipProvider delayDuration={0}>
<div
style={{ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, ...style }}
className={cn("group/sidebar-wrapper flex min-h-screen w-full", className)}
{...props}
>
{children}
</div>
</TooltipProvider>
</SidebarContext.Provider>
);
}

export function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }) {
const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

if (collapsible === "none") {
return <div className={cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className)}>{children}</div>;
}

if (isMobile) {
return (
<Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
<SheetContent className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground" side={side}>
<div className="flex h-full w-full flex-col">{children}</div>
</SheetContent>
</Sheet>
);
}

return (
<div className={cn("group peer hidden md:block text-sidebar-foreground", className)} data-state={state} data-side={side}>
<div className={cn("relative h-screen w-[--sidebar-width] bg-transparent transition-[width] ease-linear")}></div>
<div className={cn("fixed inset-y-0 z-10 hidden h-screen w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex", side === "left" ? "left-0" : "right-0")} {...props}>
<div className="flex h-full w-full flex-col bg-sidebar">
{children}
</div>
</div>
</div>
);
}

const SidebarTrigger = forwardRef(({ className, onClick, ...props }, ref) => {
const { toggleSidebar } = useSidebar();

return (
<Button
ref={ref}
data-sidebar="trigger"
variant="ghost"
size="icon"
className={cn("h-7 w-7", className)}
onClick={(event) => {
onClick?.(event);
toggleSidebar();
}}
{...props}
>
<PanelLeft />
<span className="sr-only">Toggle Sidebar</span>
</Button>
);
});

const SidebarRail = forwardRef(({ className, ...props }, ref) => {
const { toggleSidebar } = useSidebar();

return (
<button
ref={ref}
data-sidebar="rail"
aria-label="Toggle Sidebar"
tabIndex={-1}
onClick={toggleSidebar}
title="Toggle Sidebar"
className={cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all", className)}
{...props}
/>
);
});

const SidebarContent = forwardRef(({ className, ...props }, ref) => (
<div
ref={ref}
data-sidebar="content"
className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto", className)}
{...props}
/>
));

const SidebarInput = forwardRef(({ className, ...props }, ref) => (
<Input
ref={ref}
data-sidebar="input"
className={cn("h-8 w-full bg-background shadow-none", className)}
{...props}
/>
));

const SidebarSeparator = forwardRef(({ className, ...props }, ref) => (
<Separator
ref={ref}
data-sidebar="separator"
className={cn("mx-2 w-auto bg-sidebar-border", className)}
{...props}
/>
));

import React, { forwardRef, useMemo } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { useSidebar } from "@/hooks/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const SidebarMenuButton = forwardRef(({
asChild = false,
isActive = false,
variant = "default",
size = "default",
tooltip,
className,
...props
}, ref) => {
const Comp = asChild ? Slot : "button";
const { isMobile, state } = useSidebar();

const button = (
<Comp
ref={ref}
data-sidebar="menu-button"
data-size={size}
data-active={isActive}
className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
{...props}
/>
);

if (!tooltip) {
return button;
}

if (typeof tooltip === "string") {
tooltip = { children: tooltip };
}

return (
<Tooltip>
<TooltipTrigger asChild>{button}</TooltipTrigger>
<TooltipContent
side="right"
align="center"
hidden={state !== "collapsed" || isMobile}
{...tooltip}
/>
</Tooltip>
);
});
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = forwardRef(({
className,
asChild = false,
showOnHover = false,
...props
}, ref) => {
const Comp = asChild ? Slot : "button";

return (
<Comp
ref={ref}
data-sidebar="menu-action"
className={cn(
"absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
"after:absolute after:-inset-2 after:md:hidden",
"peer-data-[size=sm]/menu-button:top-1",
"peer-data-[size=default]/menu-button:top-1.5",
"peer-data-[size=lg]/menu-button:top-2.5",
"group-data-[collapsible=icon]:hidden",
showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
className
)}
{...props}
/>
);
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = forwardRef(({ className, ...props }, ref) => (
<div
ref={ref}
data-sidebar="menu-badge"
className={cn(
"absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
"peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
"peer-data-[size=sm]/menu-button:top-1",
"peer-data-[size=default]/menu-button:top-1.5",
"peer-data-[size=lg]/menu-button:top-2.5",
"group-data-[collapsible=icon]:hidden",
className
)}
{...props}
/>
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = forwardRef(({ className, showIcon = false, ...props }, ref) => {
const width = useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);

return (
<div
ref={ref}
data-sidebar="menu-skeleton"
className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
{...props}
>
{showIcon && (
<Skeleton
className="size-4 rounded-md"
data-sidebar="menu-skeleton-icon"
/>
)}
<Skeleton
className="h-4 flex-1 max-w-[--skeleton-width]"
data-sidebar="menu-skeleton-text"
style={{ "--skeleton-width": width }}
/>
</div>
);
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSkeleton = ({ className, showIcon = false, ...props }) => {
const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);

return (
<div
data-sidebar="menu-skeleton"
className={`rounded-md h-8 flex gap-2 px-2 items-center ${className}`}
{...props}
>
{showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
<Skeleton
className="h-4 flex-1 max-w-[--skeleton-width]"
data-sidebar="menu-skeleton-text"
style={{ "--skeleton-width": width }}
/>
</div>
);
};

const SidebarMenuSub = ({ className, ...props }) => (
<ul
data-sidebar="menu-sub"
className={`mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden ${className}`}
{...props}
/>
);

const SidebarMenuSubItem = ({ ...props }) => <li {...props} />;

const SidebarMenuSubButton = ({ asChild = false, size = "md", isActive, className, ...props }) => {
const Comp = asChild ? Slot : "a";

return (
<Comp
data-sidebar="menu-sub-button"
data-size={size}
data-active={isActive}
className={`flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground ${size === "sm" ? "text-xs" : "text-sm"} group-data-[collapsible=icon]:hidden ${className}`}
{...props}
/>
);
};

export {
Sidebar,
SidebarContent,
SidebarFooter,
SidebarGroup,
SidebarGroupAction,
SidebarGroupContent,
SidebarGroupLabel,
SidebarHeader,
SidebarInput,
SidebarInset,
SidebarMenu,
SidebarMenuAction,
SidebarMenuBadge,
SidebarMenuButton,
SidebarMenuItem,
SidebarMenuSkeleton,
SidebarMenuSub,
SidebarMenuSubButton,
SidebarMenuSubItem,
SidebarProvider,
SidebarRail,
SidebarSeparator,
SidebarTrigger,
useSidebar,
};