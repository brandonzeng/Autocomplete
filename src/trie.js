var Trie = function() {
    // Node data structure for the trie
    var Node = function(character) {
        var that = Object.create(Node.prototype);
        that.character = character;
        that.children = [];
        that.isLeaf = false;
        return that;
    }

    // Creates a root node for the trie
    var root = Node();

    // Private helper function for the autoComplete method
    var allWords = function(node, prefix) {
        var results = [];
        if (node.isLeaf) {
            results.push(prefix);
        }   
        // Using the list functional idiom
        Object.keys(node.children).forEach(function(char) {
            var child = node.children[char];
            results.push(allWords(child, prefix + char));   
        });
        return results;
    }

    var that = Object.create(Trie.prototype);

    // Public function for inserting words into the trie
    that.insert = function(word) {
        var node = root;
        // Using the list functional idiom
        word.split("").forEach(function(char) {
            if (!(char in node.children)) {
                node.children[char] = Node(char);
            }
            node = node.children[char];
        });
        node.isLeaf = true;
    }
    
    // Public function that autocompletes given a prefix
    that.autoComplete = function(prefix) {
        var node = root;
        var validPrefix;
        // Using the list functional idiom, breaking at a nonmatching character
        prefix.split("").every(function(char) {
            validPrefix = (char in node.children);
            node = node.children[char];
            return validPrefix;
        });
        if (validPrefix) { 
            // Using the reduce functional to flatten arrays
            var flatten = function(array) {
                return array.reduce(function(a, b) {
                    var items = Array.isArray(b) ? flatten(b) : [b];
                    return a.concat(items);
                }, []);
            }
            return flatten(allWords(node, prefix));
        }
        return [];   
    }

    return that;
}