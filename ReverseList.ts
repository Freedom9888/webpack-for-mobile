/*class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param head ListNode类 
 * @return ListNode类
 */
export function ReverseList(head: ListNode): ListNode {
    // 如果链表为空或只有一个节点，直接返回
    if (!head || !head.next) {
        return head;
    }
    
    let prev: ListNode = null;
    let curr: ListNode = head;
    
    while (curr) {
        // 保存下一个节点的引用
        const next: ListNode = curr.next;
        // 反转当前节点的指针
        curr.next = prev;
        // 移动prev和curr指针
        prev = curr;
        curr = next;
    }
    
    return prev;
}