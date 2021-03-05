import React from 'react';
// here we can initialise with any value we want.
const SongContext = React.createContext({}); 
export const SongProvider = SongContext.Provider;
export const SongConsumer = SongContext.Consumer;
export default SongContext;