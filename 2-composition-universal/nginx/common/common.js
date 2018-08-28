function save(key, data) {
    if (typeof data === 'string') {
        localStorage.setItem(key, data);
    }
    if (typeof data === 'object') {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

function fetch(key) {
    const notes = localStorage.getItem(key)
    return notes ? notes : null;
}

// const note = {
//     name: 'Reborn',
//     notes: [{
//             id: 1,
//             content: 'Vue js',
//             finished: false
//         },
//         {
//             id: 2,
//             content: 'React js',
//             finished: true
//         },
//         {
//             id: 3,
//             content: 'Angular js',
//             finished: false
//         },
//     ],
// };

// if (!fetch('notes')) {
//     save('notes', note.notes);
// }

// note.notes = JSON.parse(fetch('notes'))
