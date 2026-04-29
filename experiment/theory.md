Numbers are full of fascinating patterns and properties. In this experiment, you will explore advanced number-theoretic ideas that go beyond the basics, using the power of computer programming to solve and understand them. We focus on two main concepts:

1. **Divisibility (with a special look at digital roots)**
2. **Circular numbers**

---

### 1. Divisibility and Digital Roots

Divisibility rules help us quickly determine if a number is divisible by another without performing full division. One classic example is the rule for divisibility by 9:

> A number is divisible by 9 if the sum of its digits is also divisible by 9.

This process can be repeated (finding the "digital root") until a single digit remains.

**Example:**

Suppose you want to check if 9009 is divisible by 9:

\[
9 + 0 + 0 + 9 = 18 \\
1 + 8 = 9
\]

Since the final sum is 9, 9009 is divisible by 9.

This method works for any positive integer and is especially useful for large numbers.

---

### 2. Circular Numbers

A number is called **circular** if, when you multiply it by its units digit, the result is the same number with its digits rotated right (the units digit moves to the front).

**Example:**

102564 × 4 = 410256

Here, multiplying by 4 (the units digit) rotates the digits to the right.

Finding such numbers is a fun challenge and helps you understand deeper patterns in number representations.

---

### Step-by-Step Construction of a Circular Number

Suppose the number we require is represented as $X = (X_0, X_1, ..., X_N)$, where we do not know the values of $X_0, X_1, ..., X_{N-1}$ or $N$, but we know some properties about this number that help us find it. We know the value of $X_N$ (the units digit).

Let's take a sample input: $X_N = 4$. We represent the product as $P = (P_0, P_1, ..., P_M)$. Now $X_N = 4$ and when we multiply it with $X_N$ we get $16$ ($4 \times 4$), which implies $P_M = 6$.

Since the number has to be circular, it is obvious that $X_{N-1}$ must be 6. Now, multiply $X_{N-1} = 6$ with $X_N = 4$ and **add the carry** from the previous step. So $P_{M-1} = (6 \times 4 + 1) \mod 10 = 5$ and the carry is 2 this time. Continue this process:

**Step 1:**

xxxxxx4 × 4
→ 6 and carry = 1

**Step 2:**

xxxxx64 × 4
→ 56 and carry = 2

**Step 3:**

xxxx564 × 4
→ 256 and carry = 2

**Step 4:**

xxx2564 × 4
→ 0256 and carry = 1

**Step 5:**

xx02564 × 4
→ 10256 and carry = 0

**Step 6:**

x102564 × 4
→ 410256 and carry = 0

At step 6, you can observe that the number is exactly the circular number. So we stop here.

**Stopping Criteria:**

- The carry must be 0.
- The units digit with which we multiply must be the same as the last digit generated in the product.

Here, the multiplication digit is 4. Thus, the output is **102564**.

---

### Why Study More on Numbers?

Exploring these properties helps you:

- Discover elegant shortcuts and tricks in mathematics.
- Develop efficient algorithms for number-theoretic problems.
- Connect mathematical ideas with practical programming.

---

_This experiment encourages you to implement algorithms for divisibility and circular numbers, deepening your understanding of number theory and programming._
