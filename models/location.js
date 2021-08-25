let graph = {    
    A: {B: 5},
    B: {A: 5, C: 7, D: 3},
    C: {B: 7, E: 4},
    D: {B: 3, E: 10, F: 8},
    E: {C: 4, D: 10},
    F: {D: 8}    
}

module.exports = graph;