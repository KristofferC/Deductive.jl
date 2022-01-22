var documenterSearchIndex = {"docs":
[{"location":"internals/proof_utilities/#Proof-Utilities","page":"Proof Utilities","title":"Proof Utilities","text":"","category":"section"},{"location":"internals/proof_utilities/","page":"Proof Utilities","title":"Proof Utilities","text":"Deductive.ProofLine\nDeductive.ProofLine(::Int, ::AbstractExpression, ::A) where {A}\nDeductive.ProofLine(::Int, ::AbstractExpression, ::A, ::Deductive.ProofLine) where {A}","category":"page"},{"location":"internals/proof_utilities/#Deductive.ProofLine","page":"Proof Utilities","title":"Deductive.ProofLine","text":"ProofLine(line::Int, statement::AbstractExpression, argument::A, references::Vector{ProofLine}) where {A}\n\nRepresents a single line in a step-by-step proof, made up by a statement, an argument, and a set of references necessary to make the provided argument. A line number is also required to serve as a unique human-readable identifier for each line.\n\n\n\n\n\n","category":"type"},{"location":"internals/proof_utilities/#Deductive.ProofLine-Union{Tuple{A}, Tuple{Int64, AbstractExpression, A}} where A","page":"Proof Utilities","title":"Deductive.ProofLine","text":"ProofLine(line::Int, statement::AbstractExpression, argument::A=\"N/A\") where {A}\n\nCreates a ProofLine without any references to other lines and without an argument. Implicitly this means in most proofs that this line depends only on the previous one, but can also be taken to mean \"is a conclusion of all statements above\".\n\n\n\n\n\n","category":"method"},{"location":"propositional_logic/#Propositional-Logic","page":"Propositional Logic","title":"Propositional Logic","text":"","category":"section"},{"location":"propositional_logic/","page":"Propositional Logic","title":"Propositional Logic","text":"using Deductive\n\n@symbols a b\n\ntableau(a ∧ b)      # true\ntableau(a ∧ b, ¬a)  # false, because contradiction\n\nprintln(truthtable(a ∧ b))\n#= Outputs:\n Row │ a      b      a ∧ b \n     │ Bool   Bool   Bool  \n─────┼─────────────────────\n   1 │ false  false  false\n   2 │  true  false  false\n   3 │ false   true  false\n   4 │  true   true   true\n=#","category":"page"},{"location":"propositional_logic/","page":"Propositional Logic","title":"Propositional Logic","text":"Several operators are exported and their use is required in defining statements.","category":"page"},{"location":"propositional_logic/","page":"Propositional Logic","title":"Propositional Logic","text":"Symbol Completion Sequence Description\n¬ \\neg Negation\n∧ \\wedge Logical Conjunction\n∨ \\vee Logical Disjunction\n→ \\rightarrow Material Implication\n⟷ \\leftrightarrow Material Equivalence","category":"page"},{"location":"internals/assertion_proofs/#Assertion-Proofs","page":"Assertion Proofs","title":"Assertion Proofs","text":"","category":"section"},{"location":"internals/assertion_proofs/","page":"Assertion Proofs","title":"Assertion Proofs","text":"Assertion proofs are a kind of proof structured in a manner where one starts with a set of statements they would like to prove in terms of another set of statements. Deductive makes this distinction so that a given-goal structure can be defined which describes such a system.","category":"page"},{"location":"internals/assertion_proofs/#Given-Goal-Proofs","page":"Assertion Proofs","title":"Given Goal Proofs","text":"","category":"section"},{"location":"internals/assertion_proofs/","page":"Assertion Proofs","title":"Assertion Proofs","text":"Given-goal systems are useful for a number of reasons, such as allowing for clear meta-transformations like a contradictory or contrapositive system, better reflecting the underlying form which mathematical proofs usually fall under, and cutting down on search algorithm costs by utilizing inference rules as a means of statement transformation instead of replacement rules, which can be applied recursively to an expression tree rather than just the \"top\".","category":"page"},{"location":"internals/assertion_proofs/","page":"Assertion Proofs","title":"Assertion Proofs","text":"GivenGoal\ngiven\ngoal","category":"page"},{"location":"internals/assertion_proofs/#Deductive.GivenGoal","page":"Assertion Proofs","title":"Deductive.GivenGoal","text":"GivenGoal(given::Set{AbstractExpression}, goal::Set{AbstractExpression})\n\nInitialize a structure representing a proof starting and ending point, with given and goal sets of expressions respectively. This structure on its own isn't enough to conduct a proof, however. A proof requires both a GivenGoal and a logical calculus which defines the allowed elementary operations on expressions. For example, if operating within propositional logic, see the  PropositionalCalculus definition.\n\n\n\n\n\n","category":"type"},{"location":"internals/assertion_proofs/#Deductive.given","page":"Assertion Proofs","title":"Deductive.given","text":"given(gg::GivenGoal)\n\nReturns the given part of a GivenGoal\n\n\n\n\n\n","category":"function"},{"location":"internals/assertion_proofs/#Deductive.goal","page":"Assertion Proofs","title":"Deductive.goal","text":"goal(gg::GivenGoal)\n\nReturns the goal part of a GivenGoal\n\n\n\n\n\n","category":"function"},{"location":"internals/assertion_proofs/#Matching-Algorithms","page":"Assertion Proofs","title":"Matching Algorithms","text":"","category":"section"},{"location":"internals/assertion_proofs/","page":"Assertion Proofs","title":"Assertion Proofs","text":"The given-goal proof definition requires one to apply inference rules repeatedly. These inference rules take the form of a set of expressions which, when matched to a subset of the statements in a given section of a proof, the conclusion part of the inference rule becomes the logical consequence of that subset of given statements.","category":"page"},{"location":"internals/assertion_proofs/","page":"Assertion Proofs","title":"Assertion Proofs","text":"rule_matches\nrule_combinations\nDeductive.is_partner_map\nDeductive.has_partner_map","category":"page"},{"location":"internals/assertion_proofs/#Deductive.rule_matches","page":"Assertion Proofs","title":"Deductive.rule_matches","text":"rule_matches(ir::InferenceRule, haystack::Set{T}) where {T <: AbstractExpression}\n\nComputes a vector of matches in which each element is a valid set of possible symbol values, with the catch being that any two sets drawn from different elements of the output vector may or may not be compatible. It is not recommended that this function be used externally. Instead, see rule_combinations, which outputs a more usable form of rule match, which instead enumerates over all possible matches. Although informationally identical, rule_combinations is usually preferable due to its linearly iterable ouptut.\n\n\n\n\n\n","category":"function"},{"location":"internals/assertion_proofs/#Deductive.rule_combinations","page":"Assertion Proofs","title":"Deductive.rule_combinations","text":"rule_combinations(rule_variables::Set{LogicalSymbol}, reduced_symbol_maps::Vector{Set{SymbolMap}}, current_symbol_map=SymbolMap())\n\nGiven a set of variables which all valid combinations must map to and a list of symbol map sets, compute the set of valid combinations of these symbol maps. In most cases this signature should be avoided in favor of the rule_combinations implementation which directly takes an inference rule and set of expressions.\n\n\n\n\n\nrule_combinations(ir::InferenceRule, haystack::Set{T}) where {T <: AbstractExpression}\n\nFind all valid symbol substitutions which can be performed on a set of statements by an inference rule.\n\nExamples\n\nThe following code demonstrates that modus ponens can be applied on this set of statements by taking a → b to be true and uses this to imply c. Since the rule for modus ponens is stated with the inference rule (p, p → q) ⊢ q, the  variable substitutions corresponding to the logic above would be p => a → b and q => c.\n\n@symbols a b c\nmodus_ponens = rule_by_name(PropositionalCalculus, \"Modus Ponens\")\nmy_premises = Set{AbstractExpression}([\n    a → b,\n    (a → b) → c\n])\n\nrule_combinations(modus_ponens, my_premises)\n#= Results in:\nSet with 1 element:\n  Dict(q => c, p => a → b)\n=#\n\nSimilarly we inspect an example where multiple possible variable substitutions exist. The rule for double negation introduction is defined as p ⊢ ¬¬p, which can apply universally to all statements in a set of premises.\n\n@symbols a b\ndouble_negation = rule_by_name(PropositionalCalculus, \"Double Negation Introduction\")\nmy_premises = Set{AbstractExpression}([\n    a,\n    b,\n    a ∧ b\n])\n\nrule_combinations(double_negation, my_premises)\n#= Results in:\nSet with 3 elements:\n  Dict(p => a ∧ b)\n  Dict(p => a)\n  Dict(p => b)\n=#\n\n\n\n\n\n","category":"function"},{"location":"internals/assertion_proofs/#Deductive.is_partner_map","page":"Assertion Proofs","title":"Deductive.is_partner_map","text":"is_partner_map(sym_map::SymbolMap, compare_sym_map::SymbolMap)\n\nChecks whether sym_map and compare_sym_map are \"partner maps\". Two symbol maps are partners if they do not form any contradictions between their intersection.\n\n\n\n\n\n","category":"function"},{"location":"internals/assertion_proofs/#Deductive.has_partner_map","page":"Assertion Proofs","title":"Deductive.has_partner_map","text":"has_partner_map(sym_map::SymbolMap, compare_sym_map_set::Set{SymbolMap})\n\nChecks whether sym_map has a single partner in the set compare_sym_map_set.\n\n\n\n\n\n","category":"function"},{"location":"internals/expressions/#Expressions","page":"Expressions","title":"Expressions","text":"","category":"section"},{"location":"internals/expressions/","page":"Expressions","title":"Expressions","text":"Fundamentally software attempting to both define and prove theorems requires an extensive set of utilities surrounding the function of manipulating expressions. The lowest level of abstraction of expressions in this package is AbstractExpression, from which all expression types inherit from. Anything from symbols to sets are expressions, and a good rule for determining whether something is an expression or not is if it would make mathematical sense to write such an expression down as either a statement or a mathematical object. Logical operations are not expressions since on their own they carry no meaning without arguments.","category":"page"},{"location":"internals/expressions/#Logical-Symbols","page":"Expressions","title":"Logical Symbols","text":"","category":"section"},{"location":"internals/expressions/","page":"Expressions","title":"Expressions","text":"LogicalSymbol\n@symbols\nname(::LogicalSymbol)\nmetadata(::LogicalSymbol)","category":"page"},{"location":"internals/expressions/#Deductive.LogicalSymbol","page":"Expressions","title":"Deductive.LogicalSymbol","text":"LogicalSymbol(name::Symbol, metadata::Any=nothing)\n\nRepresent a logical symbolically with a provided name. By default the attached metadata is set to nothing.\n\n\n\n\n\n","category":"type"},{"location":"internals/expressions/#Deductive.@symbols","page":"Expressions","title":"Deductive.@symbols","text":"Define any number of LogicalSymbols with the names provided.\n\nExamples\n\njulia> @symbols a  # defines symbol `a` in the current scope\n\njulia> @symbols b c d  # defines symbols `a`, `b`, and `c`\n\njulia> @symbols α β γ  # defines symbols `α`, `β`, and `γ`\n\n\n\n\n\n","category":"macro"},{"location":"internals/expressions/#Deductive.name-Tuple{LogicalSymbol}","page":"Expressions","title":"Deductive.name","text":"name(sym::LogicalSymbol)\n\nThe name of the symbol provided at instantiation. Equivalent to symbol(sym).\n\n\n\n\n\n","category":"method"},{"location":"internals/expressions/#Deductive.metadata-Tuple{LogicalSymbol}","page":"Expressions","title":"Deductive.metadata","text":"metadata(sym::LogicalSymbol)\n\nThe metadata of the symbol provided at instantiation, if any. Returns nothing if none was provided.\n\n\n\n\n\n","category":"method"},{"location":"#Deductive","page":"Deductive","title":"Deductive","text":"","category":"section"},{"location":"","page":"Deductive","title":"Deductive","text":"CurrentModule = Deductive","category":"page"},{"location":"","page":"Deductive","title":"Deductive","text":"Welcome to the Deductive Documentation!","category":"page"},{"location":"","page":"Deductive","title":"Deductive","text":"note: Note\nAs of now these docs are mainly for advanced users, as many of the user-facing features are not ready for release yet. Take a look at Deductive's README for a basic introduction to the stable front-facing user features.","category":"page"},{"location":"#Installation","page":"Deductive","title":"Installation","text":"","category":"section"},{"location":"","page":"Deductive","title":"Deductive","text":"Open up a Julia REPL, press the character ] to enter package manager mode, and type the following command:","category":"page"},{"location":"","page":"Deductive","title":"Deductive","text":"pkg> add Deductive","category":"page"},{"location":"#Basic-Usage","page":"Deductive","title":"Basic Usage","text":"","category":"section"},{"location":"","page":"Deductive","title":"Deductive","text":"The best way to get accustomed to the syntax of Deductive is to start with Propositional Logic.","category":"page"}]
}
