// utils.js

export function getShortContent(content, maxCount){
    if(content.length > maxCount){
        return content.slice(0, maxCount) + '...';
    }
    return content
}