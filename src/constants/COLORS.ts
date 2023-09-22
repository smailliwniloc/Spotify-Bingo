// palette generated at https://coolors.co/a9cef4-000000-b6be9c-7c238c-04724d

type Color = {
    hex: string,
    rgba: (opacity: number) => string
}

export const BLUE: Color = {
    hex: "#A9CEF4",
    rgba: (opacity) => `rgba(169, 206, 244, ${opacity})`
}
export const BLACK: Color = {
    hex: "#000000", 
    rgba: (opacity) => `rgba(0, 0, 0, ${opacity})`
}
export const SAGE: Color = {
    hex: "#B6BE9C",
    rgba: (opacity) => `rgba(182, 190, 156, ${opacity})`
}
export const PURPLE: Color = {
    hex: "#7C238C",
    rgba: (opacity) => `rgba(124, 35, 140, ${opacity})`
}
export const GREEN: Color = {
    hex: "#04724D",
    rgba: (opacity) => `rgba(4, 114, 77, ${opacity})`
}